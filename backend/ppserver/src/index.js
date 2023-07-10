const express = require("express");
const dbConnect = require("./db/dbConnect");
const bcrypt = require("bcrypt");
const User = require("./db/userModel");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("/db", (req, res) => {
    dbConnect();
    res.send("Connected to database");
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
