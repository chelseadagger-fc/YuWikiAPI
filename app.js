const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

main().catch(err => console.log(err));

async function main() {
    mongoose.set("strictQuery", false);
    await mongoose.connect('mongodb://127.0.0.1:27017/booksDB');
}


// ////////////////////////////////////


const bookSchema = {
    title: String,
    author: String,
    content: String
}

const Book = mongoose.model("Book", bookSchema);


// ////////////////////////////////////

app.route("/books")
    .get((req, res) => {
        Book.find({})
            .then((foundBooks) => {
                res.send(foundBooks);
            })
            .catch(function() {
                console.log(error);
            })
    })
    .post((req, res) => {
        console.log("Post request console.log:")
        console.log("Title: " + req.body.title);
        console.log("Author: " + req.body.author);
        console.log("Content: " + req.body.content);

        const newBook = new Book({
            title: req.body.title,
            author: req.body.author, 
            content: req.body.content
        });

        newBook.save()
            .then(function() {
                res.send("Successfully added book.");
            })
            .catch(function() {
                console.log(error);
            })
    })


app.listen(3000, function() {
    console.log("Server is running; listening to port 3000");
})