const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));







app.listen(3000, function() {
    console.log("Server is running; listening to port 3000");
})