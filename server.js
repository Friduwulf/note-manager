//Packages needed for server.js
const exp = require("constants");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
//Set up port for app
const PORT = process.env.PORT || 3033;

//Code for middleware
//Use the ./public directory
app.use(express.static("./public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Route for API
//Route for getting
app.get("/api/notes", (req, res) => {
    //Retrieves the note list from the db
    const noteList = JSON.parse(fs.readFileSync("./db/db.json"))
    //Responds with the note list
    res.json(noteList);
});
//Route for posting
app.post("/api/notes", (req, res) => {
    //Creates a new note using the body of the request
    const noteNew = req.body;
    //Retrieves the note list from the db
    const noteList = JSON.parse(fs.readFileSync("./db/db.json"))
    //Gives each new note an ID = to its place on the list
    noteNew.id = noteList.length + 1;
    //Adds the new note to the end of the note list
    noteList.push(noteNew);
    //Writes the new note list back in the db
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList))
    //Responds with the note list
    res.json(noteList);
});