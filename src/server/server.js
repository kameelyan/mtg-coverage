require("dotenv").config();

var path = require('path');
var express = require('express');

var app = express();
const port = 5000;

app.route('/api/settings').get((req, res) => {
  res.send('settings!');
});

app.listen(port, function () {
    console.log("listening to port: " + port);
});
