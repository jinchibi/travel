const { mysqlPool } = require('../config/database');

// MySQL操作示例
const mysqlOperations = {
    // 创建数据
    async create(data) {
        try {
            const [result] = await mysqlPool.execute(
                'INSERT INTO demos (title, description) VALUES (?, ?)',
                [data.title, data.description]
            );
            return result;
        } catch (error) {
            console.error('MySQL创建数据失败:', error);
            throw error;
        }
    },

    // 查询数据
    async findAll() {
        try {
            const [rows] = await mysqlPool.execute('SELECT * FROM demos');
            return rows;
        } catch (error) {
            console.error('MySQL查询数据失败:', error);
            throw error;
        }
    },

    // 更新数据
    async update(id, data) {
        try {
            const [result] = await mysqlPool.execute(
                'UPDATE demos SET title = ?, description = ? WHERE id = ?',
                [data.title, data.description, id]
            );
            return result;
        } catch (error) {
            console.error('MySQL更新数据失败:', error);
            throw error;
        }
    },

    // 删除数据
    async delete(id) {
        try {
            const [result] = await mysqlPool.execute(
                'DELETE FROM demos WHERE id = ?',
                [id]
            );
            return result;
        } catch (error) {
            console.error('MySQL删除数据失败:', error);
            throw error;
        }
    }
};

module.exports = mysqlOperations;