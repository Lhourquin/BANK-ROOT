const express = require("express");
const app = express();
const {pool} = require("./dbConfig");
const bcrypt = require('bcrypt'); //To hash the password

app.set('view engine', 'ejs');// To tell the app to use ejs view engine
app.use(express.urlencoded({extended: false}));//This middleware will allow as to send data from our frontend  to our server

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
});

app.get("/users/register", (req, res) => {
    res.render("register");
});

app.post('/users/register', async (req, res)=>{
    let {first_name, last_name, email,balance,  password, password2}  = req.body;
    let errors = [];
 
    if( !first_name || !last_name  ||  !email || !password  || !password2 ){
        errors.push({message: "Please enter all the fields"});
    }

    if( password != password2){
        errors.push({message: "Password do not mach"});
    }

    if(errors.length > 0){
        console.log('====================================');
       
        console.log('====================================');
        res.render('register', {errors} )
    }else{
        //
       let hashedPassword = await bcrypt.hash(password, 10);//To hash the password before sending it to the database
       console.log('====================================');
       console.log(hashedPassword);
       console.log('====================================');
        
    }
 

    

})
app.listen(PORT,() => {
    console.log('====================================');
    console.log(`Server running 🚀🚀on port ${PORT}`);
    console.log('====================================');
} )