var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'volunteers'
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Volunteeers' });
});

router.post('/add', function (req, res, next) {
    pool.getConnection((err, connection) => {
        const sql = `INSERT INTO volunteers (id, name, emailAddress, phoneNumber) VALUES (NULL, '${req.body.name}', '${req.body.email}', '${req.body.phoneNumber}');`;
        console.log(sql);
        connection.query(sql, (err, result) => {
            console.log(result)
            // const id = result.insertId;
            connection.release();

            res.json({
                success: true,
                message: 'Done!'
            });
        });
    });

})


module.exports = router;
