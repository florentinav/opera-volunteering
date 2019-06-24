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
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    pool.getConnection((err, connection) => {
        const sql = `INSERT INTO volunteers (id, name, emailAddress, phoneNumber) VALUES (NULL, '${name}', '${email}', '${phoneNumber}');`;
        console.log(sql);
        connection.query(sql, (err, result) => {
            console.log(result)
            // const id = result.insertId;
            connection.release();

            res.json({
                success: true,
                id,
                message: 'Done!'
            });
        });
    });

})


module.exports = router;
