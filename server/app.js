/*var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var bookRouter = require("./routes/books");
var usersRouter = require("./routes/users");

require("dotenv").config();

var app = express();
let corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));

app.use("/books", bookRouter);
app.use("/users", usersRouter);

module.exports = app;
*/
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const bookRouter = require('./routes/books');
const usersRouter = require('./routes/users');

const app = express();

// CORS (allow all origins for now)
app.use(cors({ origin: '*', credentials: true }));

app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/books', bookRouter);
app.use('/users', usersRouter);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
