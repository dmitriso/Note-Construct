// const express = require("express");
// const path = require("path");
// const fs = require("fs");
// const notes = require('./db/db.json');

// var app = express();
// var PORT = process.env.PORT || 3000;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static('public'));

// // HTML Routes
// app.get('/notes', function(req,res) {
//     res.sendFile(path.join(__dirname, 'public/notes.html'));
// });

// app.get('*', function(req,res) {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });


// // API Routes
// app.get('/api/notes', function(req,res) {
//     const notes = JSON.parse(fs.readFileSync('./db/db.json'));
//     console.log(notes);
//     return res.json(notes);
// });

// app.post('/api/notes', function(req,res) {
//     const notes = JSON.parse(fs.writeFileSync('./db/db.json'));
//     const newNote = req.body;
//     notes.push(newNote);
//     return res.json(newNote);
// });

// app.delete('/api/notes/:id', function(req,res) {
    
// });

// // Server listen
// app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });