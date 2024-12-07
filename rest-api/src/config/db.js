const mysql = require("mysql2");
const config = require("./config");

const dbConfig = config.db.url
  ? { uri: config.db.url }
  : {
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
    };

// Create a connection pool
const pool = config.db.url
  ? mysql.createPool(dbConfig.uri)
  : mysql.createPool(dbConfig);

// Check connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message || err);
    return;
  }
  console.log("Database connected successfully!");
  connection.release();
});

module.exports = pool;
