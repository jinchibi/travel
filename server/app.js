const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// 中间件配置
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// 数据库连接
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-system', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('数据库连接成功');
}).catch((err) => {
    console.error('数据库连接失败:', err);
});

// 路由配置
app.use('/api/visualization', require('./routes/visualization'));
app.use('/api/multimodal', require('./routes/multimodal'));
app.use('/api/recommendation', require('./routes/recommendation'));
app.use('/api/notes', require('./routes/notes'));

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('服务器内部错误');
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});

module.exports = app;