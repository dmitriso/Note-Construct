//VARIABLES AND REQUIRED MODULES
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuidv1 = require('uuidv1')
const notes = JSON.parse(fs.readFileSync('./db/db.json'));


var app = express();
var PORT = process.env.PORT || 3000;

// MIDDLEWARE   
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML Routes
app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});





//SERVER LISTEN
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });