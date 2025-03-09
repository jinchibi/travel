const bcrypt = require('bcryptjs');
const { mysqlPool } = require('../config/database');

// MySQL用户操作类
class User {
    // 根据ID查找用户
    static async findById(id) {
        try {
            const [rows] = await mysqlPool.execute(
                'SELECT * FROM users WHERE id = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            console.error('查找用户失败:', error);
            throw error;
        }
    }

    // 根据用户名查找用户
    static async findOne(criteria) {
        try {
            let query = 'SELECT * FROM users WHERE ';
            const params = [];
            
            if (criteria.username) {
                query += 'username = ?';
                params.push(criteria.username);
            } else if (criteria.email) {
                query += 'email = ?';
                params.push(criteria.email);
            } else {
                throw new Error('查询条件无效');
            }
            
            const [rows] = await mysqlPool.execute(query, params);
            return rows[0] || null;
        } catch (error) {
            console.error('查找用户失败:', error);
            throw error;
        }
    }

    // 创建新用户
    static async save(userData) {
        try {
            // 加密密码
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            
            const [result] = await mysqlPool.execute(
                'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())',
                [userData.username, userData.email, hashedPassword]
            );
            
            return { ...userData, id: result.insertId };
        } catch (error) {
            console.error('保存用户失败:', error);
            throw error;
        }
    }

    // 更新用户信息
    static async findByIdAndUpdate(id, updateData) {
        try {
            const fields = Object.keys(updateData)
                .filter(key => key !== 'id')
                .map(key => `${this.toSnakeCase(key)} = ?`)
                .join(', ');
            
            const values = Object.keys(updateData)
                .filter(key => key !== 'id')
                .map(key => updateData[key]);
            
            values.push(id);
            
            await mysqlPool.execute(
                `UPDATE users SET ${fields} WHERE id = ?`,
                values
            );
            
            return this.findById(id);
        } catch (error) {
            console.error('更新用户失败:', error);
            throw error;
        }
    }

    // 比较密码
    static async comparePassword(plainPassword, hashedPassword) {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            throw new Error(error);
        }
    }

    // 驼峰命名转换为下划线命名
    static toSnakeCase(str) {
        return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }
}

module.exports = User;