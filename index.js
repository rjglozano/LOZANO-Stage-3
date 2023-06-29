const express = require('express');
const app = express();
const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'sysdev_recruitment',
});

app.get('/programming-language/new', (req, res) => {
  const favorite = req.query.favorite;

  connection.query(
    'INSERT INTO sysdev_recruitment.programming_languages (favorites) VALUES (?)',
    [favorite],
    (err, result) => {
      if (err) throw err;
      res.send(`${favorite}`);
    }
  );
});

const PORT = 3000;
connection.getConnection((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
  app.listen(PORT, () =>
    console.log(`Stage 3 running at http://localhost:${PORT}`),
  );
});
