require("dotenv").config();

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
const port = 5000;

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
    const file = path.resolve(__dirname, 'data/tournament.json');
    const data = fs.readFileSync(file, 'utf8');
    res.send(JSON.parse(data));
});

app.put('/api/tournament', (req, res) => {
    const file = path.resolve(__dirname, 'data/tournament.json');
    console.log(file);
    fs.writeFileSync(file, JSON.stringify(req.body), 'utf8');
    res.send(file);
});

app.listen(port, function () {
    console.log("listening to port: " + port);
});
