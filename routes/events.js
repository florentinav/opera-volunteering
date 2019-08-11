var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "volunteering"
});

/* GET home page. */
router.get("/", function(req, res, next) {
  pool.getConnection((err, connection) => {
    const sql = `SELECT events.id, events.name, events.date, events.needed, count(volunteers_events.event_id) as applied FROM events LEFT JOIN volunteers_events ON events.id = volunteers_events.event_id GROUP BY (events.id)`;
    connection.query(sql, (err, results) => {
      res.json(results);
      connection.release();
    });
  });
});

router.post("/add", function(req, res, next) {
  // const id = req.body.id;
  const email = req.body.email;
  const eventId = req.body.eventId;
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;

  console.log("email", email);
  console.log("eventId", eventId);

  pool.getConnection((err, connection) => {
    const selectVolunteerId = `SELECT volunteers.id from volunteers WHERE emailAddress="${email}";`;

    connection.query(selectVolunteerId, (err, result) => {
      if (result[0]) {
        const volunteerId = result[0].id;
        console.log("volunteerId", volunteerId);

        const insertVolunteerIntoEvent = `INSERT INTO volunteers_events (event_id, volunteer_id) VALUES (${eventId}, ${volunteerId});`;
        connection.query(insertVolunteerIntoEvent, (err, result) => {
          connection.release();
          res.redirect("/");
        });
      } else {
        const insertNewVolunteer = `INSERT INTO volunteers (name, emailAddress, phoneNumber) VALUES (?, ?, ?);`;

        console.log("insert new sql", insertNewVolunteer);

        connection.query(insertNewVolunteer, [name, email, phoneNumber], (err, result) => {
          if(err) {
            console.log(err)
            return 
          }

          console.log(result);

          const volunteerId = result.insertId;
          console.log("volunteerId", volunteerId);
          const insertVolunteerIntoEvent = `INSERT INTO volunteers_events (event_id, volunteer_id) VALUES (${eventId}, ${volunteerId});`;
          connection.query(insertVolunteerIntoEvent, (err, result) => {
            connection.release();
            res.redirect("/");
          });
        });
      }
    });
  });
});

module.exports = router;
