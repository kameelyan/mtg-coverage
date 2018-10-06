require("dotenv").config();

var path = require('path');
var express = require('express');
var fs = require('fs');

var app = express();
const port = 5000;

app.route('/api/tournament').get((req, res) => {
  const file = path.resolve(__dirname, 'data/tournament.json');
  const data = fs.readFileSync(file, 'utf8');
  res.send(data);
});

app.listen(port, function () {
    console.log("listening to port: " + port);
});
