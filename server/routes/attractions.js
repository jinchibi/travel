const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();

// 获取数据
router.get('/list', async (req, res) => {
    let { page, pageSize } = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM attractions"
        )
        const tableData  = rows.map((row) => ({
            id: row.id,
            name: row.name,
            sales: row.sales,
            price: row.price,
            rating: parseInt(row.rating) === 0 ? 5.0 : row.rating,
            address: row.address,
            introduction: row.introduction
        }))

        // 处理数据，只返回当前页的数据
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const currentPageData = tableData.slice(start, end);
        res.json({
            success: true,
            code: 200,
            message: "获取数据成功",
            data: {
                total: tableData.length,
                page,
                pageSize,
                tableData: currentPageData
            }
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router