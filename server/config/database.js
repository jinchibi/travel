const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL连接池配置
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'travel_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 获取数据库连接
const connect = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            // 从连接池获取连接
            !err ? resolve(connection) : reject(err)
        })
    })
}

// 封装sql
const query = (sql, params) => {
    return new Promise(async (resolve, reject) => {
        let connection = await connect();
        connection.query(sql, params, (err, results, fields) => {
            !err ? resolve(results) : reject(err)
            // 释放连接
            connection.release()
        })
    })
}


module.exports = {
    pool,
    connect,
    query
};