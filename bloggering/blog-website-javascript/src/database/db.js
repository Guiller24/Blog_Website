const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'admin',
    database: 'blog_website'
});

// Check users connection
db.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to the database');
  });


module.exports = db;