const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL连接池配置
const mysqlPool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'travel_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 测试MySQL连接
const testMySQLConnection = async () => {
    try {
        const connection = await mysqlPool.getConnection();
        console.log('MySQL连接成功');
        connection.release();
    } catch (error) {
        console.error('MySQL连接失败:', error);
        // 如果连接失败，5秒后重试
        setTimeout(testMySQLConnection, 5000);
    }
};

module.exports = {
    mysqlPool,
    testMySQLConnection
};