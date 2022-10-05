const express = require("express");
const app = express();
/* const {pool} = require("./dbConfig");
const bcrypt = require('bcrypt'); */

app.set('view engine', 'ejs');// To tell the app to use ejs view engine

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
        res.send("Hello");
        res.rendrer("index");
});

app.get('/users/login', (req, res)=>{
    res.render("login");
})

app.get("/users/dashboard", (req, res) => {
    res.render("dashboard");
})
app.listen(PORT,() => {
    console.log('====================================');
    console.log(`Server running 🚀🚀on port ${PORT}`);
    console.log('====================================');
} )