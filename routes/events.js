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

router.post('/add', function (req, res, next) {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  pool.getConnection((err, connection) => {
      const selectVolunteerId = `SELECT volunteers.id from volunteers WHERE emailAddress="${email}";`; 

      connection.query(selectVolunteerId, (err, result) => {
        console.log('result', result[0].id);
        const volunteerId = result[0].id;
        const insertVolunteerIntoEvent = `INSERT INTO volunteers_events (event_id, volunteer_id) VALUES ('1', ${volunteerId});`
        connection.query(insertVolunteerIntoEvent, (err, result) => {
          res.json({
            success: true,
            id,
            message: 'Done!'
          });
          connection.release();
        })
      })
  })      
})

module.exports = router;
