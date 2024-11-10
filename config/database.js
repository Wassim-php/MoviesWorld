const dotenv = require('dotenv');
dotenv.config();

const mysql2= require('mysql2/promise');
let pool;
const initDB = async () => {
    if (!pool) {
      pool = mysql2.createPool({
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'user123',
        password: process.env.DB_PASSWORD || 'user',
        database: process.env.DB_NAME || 'movie_database',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
  // Test the connection
  try {
    await pool.getConnection();
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Unable to connect to MySQL:', error);
    process.exit(1);
  }
}
return pool;
};


module.exports= {initDB};