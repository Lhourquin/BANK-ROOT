
//npm run dev

///**** */
//Create new user CREATE USER Bankroot
// CREATE USER  bankroot WITH PASSWORD 'password' CREATEDB ;

//CONNECT as a new user bankroot
//psql -U bankroot -d postgres 
//CREATE DATABASE bank-node
// to list all the database \l, \c + databasename to move to another database
// \d users 

<!-- <ul>
<% if(messages.success_msg){ %>
    <li><%= messages.success_msg %></li>

<% } %>
</ul> -->


<h1>Hello <%= user %></h1>


<ul>
<% if(typeof errors != 'undefined'){ %>
    <% errors.forEach(error => {%>
        <li><%= error.message %></li>
   <% })  %>
<% } %>
</ul>


                      
                        //To check if this number is unique 
                        /* pool.query(
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
                                                             }else if(resultaccount.rows.length === 0){
                                                                    ///To d
                                                             }
                                                        }
                                                )
                                            }
                                         


                                        
                                    }
                                 }
                        )  */


                        create table accounts (

                            account_id BIGSERIAL NOT NULL PRIMARY KEY,
                        
                            account_number VARCHAR(50) NOT NULL,   
                        
                            balance NUMERIC(20, 2) NOT NULL,
                        
                            user_id BIGSERIAL REFERENCES  users(user_id),
                        
                            UNIQUE (account_number)
                        
                        );