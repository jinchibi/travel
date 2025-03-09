const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { testMySQLConnection } = require('./config/database');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// 中间件配置
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// 初始化数据库连接
testMySQLConnection();

// 路由配置
app.use('/api/visualization', require('./routes/visualization'));
app.use('/api/multimodal', require('./routes/multimodal'));
app.use('/api/recommendation', require('./routes/recommendation'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));


// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});

module.exports = app;