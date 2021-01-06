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

// HTML ROUTES
app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// API ROUTES
// THIS READS AND RETRIEVES ALL STORED NOTES IN THE DATABASE
app.get('/api/notes', (req,res) => {
    console.log(notes);
    res.json(notes);
    res.end();
});
// THIS CREATES A NEW NOTE FROM THE REQUEST AND WRITES IT TO A JSON FILE
// EACH NOTE IS GIVEN A SPECIFIC ID WHEN IT IS CREATED
app.post('/api/notes', (req,res) => {
    const newNote = req.body;
    newNote.id = uuidv1();
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    console.log(notes);
    res.json(notes);
    res.end();
});

//SERVER LISTEN
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });