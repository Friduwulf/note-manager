//Packages needed for server.js
const express = require("express");
const fs = require("fs");
const path = require("path");

const db = "./db/db.json";
const app = express();
//Set up port for app
const PORT = process.env.PORT || 3001;

//Code for middleware
//Use the ./public directory
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("./public"));

//Function for getting
app.get("/api/notes", (req, res) => {
    //Retrieves the note list from the db
    const noteList = JSON.parse(fs.readFileSync(db))
    //Responds with the note list
    res.json(noteList);
});

//Function for posting
app.post("/api/notes", (req, res) => {
    //Creates a new note using the body of the request
    const noteNew = req.body;
    //Retrieves the note list from the db
    const noteList = JSON.parse(fs.readFileSync(db))
    //Gives each new note an ID = to its place on the list
    noteNew.id = noteList.length + 1;
    //Adds the new note to the end of the note list
    noteList.push(noteNew);
    //Writes the new note list back in the db
    fs.writeFileSync(db, JSON.stringify(noteList))
    //Responds with the note list
    res.json(noteList);
});
//Function for deleting
app.delete("/api/notes/:id", (req, res) => {
    //Retrieves the note list from the db
    const noteList = JSON.parse(fs.readFileSync(db));
    //Loops through the list of notes to find the note with the same ID as the request, and then removes that note from the array
    noteList.forEach(note => {
        if(note.id == req.params.id) {
            var noteDelete = noteList.indexOf(note);
            noteList.splice(noteDelete, 1);
            return noteList;
        };
    });
    //Writes adjusted list back to the db array
    fs.writeFileSync(db, JSON.stringify(noteList));
    res.json(noteList);
});

//Calls to the HTML
//Wildcard, if anything is put in address, go to index.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
//If nothing is put in address after /, go to index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
//If notes is placed at the ned of address, go to notes.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
    console.log(`Application is listening at http://localhost:${PORT}`);
});