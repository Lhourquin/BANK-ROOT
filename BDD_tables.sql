create table users (

    user_id BIGSERIAL NOT NULL PRIMARY KEY,

    first_name VARCHAR(50) NOT NULL,

    last_name VARCHAR(50) NOT NULL,

    role  VARCHAR(50) NOT NULL,

    email VARCHAR(150) NOT NULL,

    password VARCHAR(200) NOT NULL,

    UNIQUE (email )

);

create table bank (

    id_bank SERIAL NOT NULL PRIMARY KEY,
    bank_name VARCHAR (50) NOT NULL,
    adress VARCHAR (255) NOT NULL
);

create table accounts (

    account_id BIGSERIAL NOT NULL PRIMARY KEY,

    account_number VARCHAR(50) NOT NULL,   

    balance NUMERIC(20, 2) NOT NULL,

    user_id BIGINT REFERENCES  users(user_id),

    id_bank BIGINT REFERENCES  bank(id_bank),

    UNIQUE (account_number)

);

create table operations(

    id_operation BIGSERIAL NOT NULL PRIMARY KEY,

    worded VARCHAR(255) NOT NULL,

    amount_credit DECIMAL NOT NULL,

    amount_debit DECIMAL NOT NULL,

    operation_type VARCHAR(50) NOT NULL,

    account_id BIGINT REFERENCES accounts(account_id)

);


