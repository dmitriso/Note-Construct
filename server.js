//VARIABLES AND REQUIRED MODULES
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuidv1 = require('uuidv1');
const util = require('util');
const notes = JSON.parse(fs.readFileSync('./db/db.json'));
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);


var app = express();
var PORT = process.env.PORT || 3000;

// MIDDLEWARE   
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML ROUTES
// THIS DISPLAYS THE NOTE TAKING INTERFACE TO THE SERVER
app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// THIS DISPLAYS THE MAIN PAGE TO THE SERVER
app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



// API ROUTES
// THIS READS AND RETRIEVES ALL STORED NOTES IN THE DATABASE
app.get('/api/notes', (req,res) => {
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

app.post("/api/notes", function (req, res) {
    notesdb.push(req.body)
    res.json(true);
});

// THIS SEARCHES FOR A STORED NOTE BY ID AND DELETES IT
app.delete("/api/notes/:id", function (req, res) {
    const noteData = JSON.parse(fs.readFileSync("db/db.json"));
    const newNotes = noteData.filter(function (noteObj) {
        return noteObj.id !== req.params.id;
    });
    fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
    res.json(newNotes);
});



//SERVER LISTEN
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });