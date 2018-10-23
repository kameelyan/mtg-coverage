require("dotenv").config();

var path = require('path');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var fs = require('fs');
const port = 5000;


var ensureDirectory = function (file) {
    const dir = path.dirname(file);
    if (fs.existsSync(dir)) {
        return true;
    }
    ensureDirectory(dir);
    fs.mkdirSync(dir);
};

var readTournament = function () {
    const file = path.resolve(__dirname, 'data/tournament.json');
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
};

var writeTournament = function (tournament) {
    let file = path.resolve(__dirname, 'data/tournament.json');
    ensureDirectory(file);
    fs.writeFileSync(file, JSON.stringify(tournament), 'utf8');

    writeOBSFiles(tournament);
};

var writeOBSFiles = function (tournament) {
    ensureDirectory(path.resolve(__dirname, 'obs/foo.txt'));

    // Tournament Info Data
    tournament.info.forEach((input) => {
        file = path.resolve(__dirname, 'obs/' + input.name + '.txt');
        fs.writeFileSync(file, input.value, 'utf8');
    });

    // Match Data
    tournament.matches.forEach((match) => {
        writePlayer(match.leftPlayer, match.name, 'leftPlayer');
        writePlayer(match.rightPlayer, match.name, 'rightPlayer');
    });

    // ScoreKeeper Data
    file = path.resolve(__dirname, 'obs/outstandingMatches.txt');
    fs.writeFileSync(file, tournament.scorekeeper.outstandingMatches, 'utf8');

    let i = 1;
    tournament.scorekeeper.playersToWatch.forEach((player) => {
        file = path.resolve(__dirname, 'obs/playerToWatch' + i + 'Name.txt');
        fs.writeFileSync(file, player.name, 'utf8');
        file = path.resolve(__dirname, 'obs/playerToWatch' + i + 'Record.txt');
        fs.writeFileSync(file, player.record, 'utf8');
        i++;
    });

    // Top 8 Data - Quarterfinals
    i = 1;
    tournament.top8.quarters.forEach((player) => {
        file = path.resolve(__dirname, 'obs/top8Seed' + i + 'Name.txt');
        fs.writeFileSync(file, player.name, 'utf8');
        file = path.resolve(__dirname, 'obs/top8Seed' + i + 'Deck.txt');
        fs.writeFileSync(file, player.deck, 'utf8');
        i++;
    });

    //Top 8 Data - Semifinals
    i = 1;
    tournament.top8.semis.forEach((player) => {
        let bracket = '';
        switch (i) {
            case 1:
                bracket = '_1vs8_';
                break;
            case 2:
                bracket = '_4vs5_';
                break;
            case 3:
                bracket = '_3vs6_';
                break;
            case 4:
                bracket = '_2vs7_';
                break;
        }
        file = path.resolve(__dirname, 'obs/semifinals' + bracket + 'Name.txt');
        fs.writeFileSync(file, player.name, 'utf8');
        file = path.resolve(__dirname, 'obs/semifinals' + bracket + 'Deck.txt');
        fs.writeFileSync(file, player.deck, 'utf8');
        i++;
    });

    //Top 8 Data - Finals
    i = 1;
    tournament.top8.finals.forEach((player) => {
        let bracket = '';
        switch (i) {
            case 1:
                bracket = '_top_';
                break;
            case 2:
                bracket = '_bottom_';
                break;
        }
        file = path.resolve(__dirname, 'obs/finals' + bracket + 'Name.txt');
        fs.writeFileSync(file, player.name, 'utf8');
        file = path.resolve(__dirname, 'obs/finals' + bracket + 'Deck.txt');
        fs.writeFileSync(file, player.deck, 'utf8');
        i++;
    });
};

var writePlayer = function (player, matchName, playerPrefix) {
    let filePrefix = matchName + "_" + playerPrefix;
    let file = '';
    const props = Object.keys(player);
    for (const prop in props) {
        file = path.resolve(__dirname, 'obs/' + filePrefix + capFirstLetter(props[prop]) + '.txt');
        fs.writeFileSync(file, player[props[prop]], 'utf8');
    }
};

var capFirstLetter = function (value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
};

var saveMatch = function (data) {
    const tournament = readTournament();
    let found = false;
    tournament.matches.forEach((match) => {
        if (match.name === data.name) {
            found = true;
            const props = Object.keys(match);
            for (const prop in props) {
                if (data[props[prop]]) {
                    match[props[prop]] = data[props[prop]];
                }
            }
        }
    });

    if (found) {
        writeTournament(tournament);
    }
    return found;
};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/api/tournament', (req, res) => {
    res.send(readTournament());
});

app.put('/api/tournament', (req, res) => {
    writeTournament(req.body);
    res.send(req.body);
});

app.get('/api/match/:name', (req, res) => {
    const name = req.params['name'];
    const tournament = readTournament();
    const match = tournament.matches.filter((match) => {
        return match.name === name;
    }).shift();

    if (match !== undefined) {
        if (match.available) {
            res.send(match);
        } else {
            res.statusCode = 404;
            res.send(name + ' marked as not available in admin dashboard.');
        }
    } else {
        res.statusCode = 404;
        res.send(name + ' not found.');
    }
});

app.put('/api/match', (req, res) => {
    if (saveMatch(req.body)) {
        res.send(req.body);
    } else {
        res.statusCode = 404;
        res.send(data.name + ' not found in data.');
    }
});

io.on('connection', function (socket) {
    console.log('a user connected: ' + socket.client.id);

    socket.on('updateMatch', function (data) {
        saveMatch(data);
        socket.broadcast.emit('updateMatch', data);
    });

    socket.on('updateTournament', function (data) {
        writeTournament(data);
        socket.broadcast.emit('updateTournament', data);
    });
});

server.listen(port, function () {
    console.log("listening to port: " + port);

    if (fs.existsSync(path.resolve(__dirname, 'data/tournament.json'))) {
        const tournament = readTournament();
        writeOBSFiles(tournament);
    }
});
