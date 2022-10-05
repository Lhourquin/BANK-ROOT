const express = require("express");
const app = express();
const {pool} = require("./dbConfig");
const bcrypt = require('bcrypt'); //To hash the password

app.set('view engine', 'ejs');// To tell the app to use ejs view engine
app.use(express.urlencoded({extended: false}));//This mid will allow as to send data from our frontend  to our server

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
      
        res.render("index");
});

app.get('/users/login', (req, res)=>{
    res.render("login");
})

app.get("/users/dashboard", (req, res) => {
    res.render("dashboard");
});

app.get("/users/dashboard/operation", (req, res) => {
    res.render("operations");
})
app.listen(PORT,() => {
    console.log('====================================');
    console.log(`Server running 🚀🚀on port ${PORT}`);
    console.log('====================================');
} )