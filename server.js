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