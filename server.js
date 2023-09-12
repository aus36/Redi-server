require('dotenv').config();
var express = require("express");

// create express server
var app = express();

// start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});