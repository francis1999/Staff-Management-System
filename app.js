const express = require('express');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static('public'));

//Template engine

app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

const routes = require('./server/routes/user')
app.use('/', routes);

/* app.get('', (req, res) => {
    res.render('home');
}) */



const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});

//CONNECT TO DB

pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected Successfully " + connection.threadId);
})

app.listen(port, () => console.log(`Listen on Port ${port}`))