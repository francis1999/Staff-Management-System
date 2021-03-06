const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});

exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Error in connection", + connection.threadId);
        connection.query('SELECT * FROM user', (err, rows) => {
            connection.release();
            if (!err) {
                res.render('home', { rows })
            } else {
                console.log(err);
            }
        });
    });

}

// find users by firstname and lastname
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Error in connection", + connection.threadId);
        let search = req.body.search;
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + search + '%', '%' + search + '%'], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('home', { rows })
            } else {
                console.log(err);
            }
        });
    });
}