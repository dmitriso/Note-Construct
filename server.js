//VARIABLES AND REQUIRED MODULES
const express = require("express");
const { v1: uuidv1 } = require('uuid');
const fs = require("fs");
const path = require("path");
const notes = JSON.parse(fs.readFileSync("db/db.json"))

var app = express();
var PORT = process.env.PORT || 3000;

// MIDDLEWARE   
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//SERVER LISTEN
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

// API ROUTES
// THIS READS AND RETRIEVES ALL STORED NOTES IN THE DATABASE
app.get("/api/notes", (req, res) => {
    const noteBody = JSON.parse(fs.readFileSync("db/db.json"))
    res.json(noteBody)
    console.log(noteBody);
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

// THIS SEARCHES FOR A STORED NOTE BY ID AND DELETES IT
app.delete("/api/notes/:id", function (req, res) {
    const notes = JSON.parse(fs.readFileSync("db/db.json"));
    const newNotes = notes.filter(function (noteObj) {
        return noteObj.id !== req.params.id;
    });
    fs.writeFileSync("db/db.json", JSON.stringify(notes));
    res.json(notes);
});

// HTML ROUTES
// THIS DISPLAYS THE NOTE TAKING INTERFACE TO THE SERVER
app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// THIS DISPLAYS THE MAIN PAGE TO THE SERVER
app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// THIS CATCHES ALL 404 ERRORS
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
