require('dotenv').config();
// const cors = require('cors');
const bodyParser = require('body-parser');
var express = require("express");
const bcrypt = require('bcrypt');

// create express server
var app = express();

const options = {
    origin: 'http://localhost:3000',
}
// app.use(cors(options));

// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

// functions for hashing and comparing passwords
async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

async function comparePasswords(attempt, hashed) {
    return bcrypt.compare(attempt, hashed);
}

// API
// =====================================

// default route
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

const db = require('./queries');

// get all users
app.get('/users', db.getUsers);

// get user by id
app.get('/users/:username', db.getUserByUsername);

// create new user
app.post('/users', db.createUser);

// change password
app.put('/users/:username', db.changePassword);

// delete user
app.delete('/users/:username', db.deleteUser);

// ======================================


// start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});