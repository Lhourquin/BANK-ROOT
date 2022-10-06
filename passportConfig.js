const LocalStrategy = require("passport-local").Strategy;
const {pool} =  require('./dbConfig');
const bcrypt = require('bcrypt');
const { authenticate } = require("passport");
const passport = require("passport");



/* passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
}, authenticateUser)
); */






//To initialize our localStrategy
function  initialize (passport){

    console.log('====================================');
    console.log("hello fom la bas");
    console.log('====================================');
    const authenticateUser =  (email, password, done) =>{
        //done is a function
        pool.query(
            `SELECT * FROM users WHERE email = $1`, [email], (err, result) =>{
                if(err){
                    throw err;
            }
            console.log('====================================');
            console.log(result.rows);
            console.log('====================================');
    
            //Check if the is aleardy exit
            if(result.rows.length > 0){
    
                //The the user data in the user variable
                const user = result.rows[0];
                
                //Compare the user password, with the intred password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err){
                        throw err;
                    }
    
                    if(isMatch){
                        //If the passwords matched, then use the callback function done(null, user)
                        //null means if there are err, user means there are no error
                        return  done(null, user);
                        //So this done function will return the user and store it in the session object in our application
                    }else{
                        //If the password did not match, we return the user as false with error message
                        return done(null, false, {message: "Password is not correct" });
                    }
                });
             } else{
                //If no user found in the database, we return user as false with a message to tell that the Email is not registred
                return  done(null, false, {message: "Email is not registred"});
            }
           
        }
                
         );
    };

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }
        , authenticateUser));

    passport.serializeUser((user, done) => done(null, user.user_id));//this will take the user then store the user id in the session cookies



    //To obtain the user data from the database
    passport.deserializeUser((user_id, done) => {
        pool.query(
            `SELECT * FROM users WHERE user_id = $1`, [user_id],  (err, result) => {
                if(err){
                    throw err;
                }
                return done(null, result, result.rows[0]);//Will store the user object in the session
            }
        )
    })
};


module.exports = initialize