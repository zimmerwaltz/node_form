const mysql = require('mysql');
const morgan = require("morgan");//to see your requests in log
const bodyParser = require('body-parser');//to parse the body of post request
const express = require("express");//returns a function
const app = express(); //returns an object of type express

//to see your requests in log
app.use(morgan("short"));

//to parse the body of post request and get form data
app.use(bodyParser.urlencoded({extended:false}));

//serving static files from our public folder
app.use(express.static('public'));

//creating a connection pool instead of creating a connection for every endpoint
//cuts down number of connection requests and improves performance
const pool = mysql.createPool({
    connectionLimit:10,
    host: "localhost",
    user: "root",
    password: "admin@123#",
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    database: "db_users"
});


// get ALL users from db
app.get('/users',(req,res)=>{
    //querying the db
    const queryString = 'SELECT * FROM tb_users';
    pool.query(queryString,(err,rows,fields)=>{
        if (err) throw err;
        console.log('successfully fetched');
        //display all db fields in json format
        res.json(rows);
    });
});

// get SPECIFIC users from db
app.get('/users/:id',(req,res)=>{
    const userId = req.params.id;
    //querying the db
    const queryString = 'SELECT * FROM tb_users WHERE id=?';
    pool.query(queryString,[userId],(err,rows,fields)=>{
        if (err) throw err;
        console.log('successfully fetched');
        //display specific row in json format
        if(rows.length===0){
            res.status(404).send(`The user with ID ${userId} couldn't be found`);
        }
        else{
            res.json(rows);
        }
        
    });
});

//SUBMITTING data to db from form at index.html using post (CREATION)
app.post('/create_user',(req,res)=>{
    //collecting form data
    const name = req.body.name,
        email = req.body.email,
        number = req.body.number,
        city = req.body.city,
        message = req.body.message;

    //querying the db
    const queryString = 'INSERT INTO tb_users (name,email,number,city,message) values (?,?,?,?,?)';
    pool.query(queryString,[name,email,number,city,message],(err,results,fields)=>{
        if (err){
            console.log("ERROR",err);
            res.sendStatus(500).send(`There was an error ${err}`);
            return;
        }
        //returning the ID of the user added back to the user
        res.status(200).send(`Hi ${name}. Thanks for submitting your details. Your ID is ${results.insertId}`);
        res.end();
    });
});

//DELETING data
app.delete('/users/:id',(req,res)=>{
    const userId = req.params.id;//grab ID from request
    const queryString = 'DELETE FROM tb_users WHERE id=?';

    pool.query(queryString,[userId],(err,rows,fields)=>{
        if (err) throw err;
        console.log('successfully fetched');
        //display specific row in json format
        if(rows.length===0){
            res.status(404).send(`The user with ID ${userId} couldn't be found`);
        }
        else{
            res.json(rows);
        }      
    });
});

//UPDATE data
app.put('/users/:id', (req,res)=>{
    //collecting form data
    const userId = req.params.id;
    //     name = req.body.name,
    //     email = req.body.email,
    //     number = req.body.number,
    //     city = req.body.city,
    //     message = req.body.message;

    const updateData = {
        name : req.body.name,
        email : req.body.email,
        number : req.body.number,
        city : req.body.city,
        message : req.body.message
    };

    const queryString = "UPDATE tb_users \
    SET ? \
    WHERE id = ?";

    pool.query(queryString,[updateData,userId],(err,rows,fields)=>{
        if (err) throw err;
        console.log('successfully updated');
        //display specific row in json format
        if(rows.length===0){
            res.status(404).send(`The user with ID ${userId} couldn't be found`);
        }
        else{
            res.json(rows);
        }      
    });


})

const server = app.get('/', (req,res)=>{
   console.log('hello')
});


// const port = process.env.PORT || 3000;  
const port = 8000;  
server.listen(port, ()=>{ console.log(`listening on port ${port}`)});