const express = require("express");
const port = 8000;
const db = require("./config/mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');
const passportJwt = require("./config/passport-jwt-strategy");

const app = express();

app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json());

app.use("/", require("./routes/index"));

app.listen(port, function (err) {
    if (err) {
        console.log(`error: ${err}`);
        return;
    }
    console.log("server is successfully setup and running on the port:", port);
});

module.exports = app