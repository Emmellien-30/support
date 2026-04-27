const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 🔍 Function to test connection
const testConnection = async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ MySQL Database connected successfully");
        connection.release(); // release back to pool
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1); // stop server if DB fails
    }
};

module.exports = { db, testConnection };