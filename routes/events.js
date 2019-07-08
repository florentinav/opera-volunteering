var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'volunteering'
});

/* GET home page. */
router.get('/', function (req, res, next) {
    pool.getConnection((err, connection) => {
        const sql = `SELECT events.id, events.name, events.date, events.needed, count(volunteers_events.event_id) as applied FROM events LEFT JOIN volunteers_events ON events.id = volunteers_events.event_id GROUP BY (events.id)`;
        connection.query(sql, (err, results) => {
          res.json(results);
          connection.release();
        });
      });
});

module.exports = router;
