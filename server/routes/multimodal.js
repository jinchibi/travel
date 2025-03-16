const express = require("express");
const { pool } = require("../config/database");
const router = express.Router();
const sharp = require("sharp");
const fs = require("fs");

// 上传多模态数据
router.post("/upload", async (req, res) => {
  try {
    // 实现多模态数据上传逻辑
    const { name, type, description, file, userId } = req.body;
    // 在multimodal_data表中添加数据
    const [result] = await pool.execute(
      "INSERT INTO multimodal_data (data_name, data_type, data_description, data_file, user_id) VALUES (?, ?, ?, ?, ?)",
      [name, type, description, file, userId]
    );

    res.json({
      success: true,
      message: "数据上传成功",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "数据上传失败",
      error: error.message,
    });
  }
});

// 获取多模态数据列表
router.get("/list", async (req, res) => {
  try {
    // 获取分页参数
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const userId = req.query.userId;

    // 查询分页数据
    const [rows] = await pool.execute(
      "SELECT * FROM multimodal_data WHERE user_id =?;",
      [userId]
    );

    const tableData = rows.map((row) => {
      const data = {
        id: row.data_id,
        name: row.data_name,
        type: row.data_type,
        description: row.data_description,
        file: `/image/${row.data_id}`, // 图片的访问 URL
      };
      return data;
    });

    res.json({
      success: true,
      code: 200,
      message: "获取数据列表成功",
      data: {
        total: tableData.length,
        page,
        pageSize,
        mutilmodal: tableData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "获取数据列表失败",
      error: error.message,
    });
  }
});

// 删除多模态数据
router.delete("/:id", async (req, res) => {
  try {
    // 实现数据删除逻辑
    const id = req.params.id;

    // 从数据库中删除指定ID的记录
    const [result] = await pool.execute(
      "DELETE FROM multimodal_data WHERE data_id = ?",
      [id]
    );

    // 检查是否成功删除
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "未找到要删除的数据",
      });
    }
    res.json({
      success: true,
      message: "数据删除成功",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "数据删除失败",
      error: error.message,
    });
  }
});

module.exports = router;
