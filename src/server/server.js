require("dotenv").config();

var path = require('path');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var fs = require('fs');
const port = 5000;

var readTournament = function () {
    const file = path.resolve(__dirname, 'data/tournament.json');
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
};

var writeTournament = function (tournament) {
    const file = path.resolve(__dirname, 'data/tournament.json');
    fs.writeFileSync(file, JSON.stringify(tournament), 'utf8');
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
});

server.listen(port, function () {
    console.log("listening to port: " + port);
});
