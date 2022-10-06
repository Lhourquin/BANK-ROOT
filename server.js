const express = require("express");
const app = express();
const {pool} = require("./dbConfig");
const bcrypt = require('bcrypt'); //To hash the password
const passport = require('passport');
const session = require('express-session');
const flash = require("express-flash");

const initializePassword = require('./passportConfig');
initializePassword(passport);



app.set('view engine', 'ejs');// To tell the app to use ejs view engine
app.use(express.urlencoded({extended: false}));//This middleware will allow as to send data from our frontend  to our server
app.use(session({
    secret: 'secret',//Will encrpt all of our information
    resave: false,//We resave our session variables if nothing been  changed
    saveUninitialized: false,// ?
}));
app.use(flash());//To dispaly our flash messages


app.use(passport.session());//
app.use(passport.initialize());//




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
       let user_id ;

        //Query from y database
        pool.query(
            `SELECT * FROM users
            WHERE email = $1` , [email], (err, result) =>{
                if(err){
                    throw err
                }else{
                 
                    
                
                    if(result.rows.length > 0){
                        errors.push({message: "Email already registerd"})
                        res.render('register', {errors});
                    }else{

                        //INSERT USER
                        pool.query(
                            `INSERT INTO users (first_name, last_name, role, email, password)
                            VALUES($1, $2, $3, $4, $5)
                            RETURNING  user_id, password`, [first_name, last_name, 'client', email , hashedPassword], (err, result) =>{
                                    if(err){
                                        throw err;
                                    }

                                    console.log('====================================');
                                    console.log(result);
                                    console.log('====================================');
                                    //We can  use RETURNING id, password ... 
                                    pool.query(
                                        `SELECT user_id FROM users 
                                        WHERE email = $1`, [email],  (err, reslut)=>{
                                            if(err){
                                                throw err;
                                            }else{
                                                user_id =  reslut.rows[0].user_id;//Store the user_id//
                                                console.log(user_id);

                                                //To generate random account_number
                                                let account_number =  Math.floor(Math.random() * 1000000000);

                                                 //To check if this number is unique 
                                                pool.query(
                                                    `SELECT * FROM accounts
                                                        WHERE account_number = $1`, [account_number], (err, resultaccount)=>{
                                                            if(err){
                                                                throw err;
                                                            }else{
                                                                let taken = resultaccount.rows.length;
                                            
                                                                    while( taken > 0){
                                                                        account_number =  Math.floor(Math.random() * 1000000000);

                                                                        pool.query(
                                                                            `SELECT * FROM accounts
                                                                                WHERE account_number = $1`, [account_number], (err, resultaccount) =>{
                                                                                    if(err){
                                                                                        throw err;
                                                                                    }else {
                                                                                            taken = resultaccount.rows.length;
                                                                                    }
                                                                                }
                                                                        )


                                                                    }

                                                                    pool.query(
                                                                        `INSERT INTO accounts (account_number, balance, user_id)
                                                                        VALUES ($1 , $2 , $3)`, [account_number,balance, user_id ], (err, reslut) => {
                                                                                if(err){
                                                                                    throw err;
                                                                                }else{

                                                                                    console.log('====================================');
                                                                                    console.log("All is good", reslut);
                                                                                    console.log('====================================');
                                                                                    req.flash("success_msg", "You are registred now, Please login");
                                                                                    res.redirect("/users/login");
                                                                                    
                                                                                }
                                                                        }
                                                                        );
                                                            }
                                                        }
                                                )  
                                                                    
                                            }
                                        }
                                 )
                            }


                        );

                     
                       
                       
                       
                        
  
                    }
                }
            } 
        )
    }
 
});

app.post('/users/login', passport.authenticate("local", {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true// means if, we cant authenticate, the faileur will return one of our message on the server flash message
} ));//

app.listen(PORT,() => {
    console.log('====================================');
    console.log(`Server running 🚀🚀on port ${PORT}`);
    console.log('====================================');
} )