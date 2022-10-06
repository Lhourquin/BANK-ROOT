const LocalStrategy = require("passport-local").Strategy;
const {pool} =  require('./dbConfig');
const bcrypt = require('bcrypt');
const { authenticate } = require("passport");

const authenticateUser =  (email, password, done) =>{
    pool.query(
        `SELECT *FROM users WHERE email = $1`, [email], (err, result) =>{
            if(err){
                console.log('====================================');
                console.log(result.rows);
                console.log('====================================');
                if(result.rows.length > 0){
                    const user = result.rows[0];

                    bcrypt.compare(password, user.password, (err, isMatched) => {
                        if(err){
                            throw err;
                        }

                        if(isMatched){
                            return  done(null, user);
                        }else{
                            return done(null, false, {message: "Password is not correct" })
                        }
                    });
                }
            }else{
                return  done(null, false, {message: "Email not registred"});
            }
        }
    )
}

function  initialize (passport){
        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }), authenticateUser)
}