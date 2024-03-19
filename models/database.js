const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: '',
  password: '',
  database: ''
});

console.log('mysql2 pool ready')

module.exports = pool.promise(); // Export the promise-based pool