require('dotenv').config();
const bodyParser = require('body-parser');
var express = require("express");

// create express server
var app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// API

const db = require('./queries');

// get all users
app.get('/users', db.getUsers);

// get user by id
app.get('/users/:id', db.getUserById);

// create new user
app.post('/users', db.createUser);

// update user
app.put('/users/:id', db.updateUser);

// delete user
app.delete('/users/:id', db.deleteUser);

// start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});