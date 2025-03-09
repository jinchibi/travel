const express = require('express');
const router = express.Router();

// 上传多模态数据
router.post('/upload', async (req, res) => {
    try {
        // TODO: 实现多模态数据上传逻辑
        res.json({
            success: true,
            message: '数据上传成功',
            data: {
                id: 'temp-id',
                type: req.body.type,
                url: 'temp-url'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '数据上传失败',
            error: error.message
        });
    }
});

// 获取多模态数据列表
router.get('/list', async (req, res) => {
    console.log('获取数据')
    try {
        // 获取分页参数
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const tableData = [
            {
              id: 1,
              name: '景区图片集',
              type: 'image',
              description: '包含各个景点的高清图片',
              createTime: '2024-01-15 10:00:00'
            },
            {
              id: 2,
              name: '景区介绍视频',
              type: 'video',
              description: '景区宣传片和导览视频',
              createTime: '2024-01-15 11:30:00'
            },
            {
              id: 3,
              name: '景区音频导览',
              type: 'audio',
              description: '景区语音讲解和背景音乐',
              createTime: '2024-01-16 09:15:00'
            },
            {
              id: 4,
              name: '景区文字介绍',
              type: 'text',
              description: '景区历史和文化背景介绍',
              createTime: '2024-01-16 14:20:00'
            },
            {
              id: 5,
              name: '自然风光图集',
              type: 'image',
              description: '自然风景高清图片集',
              createTime: '2024-01-17 11:00:00'
            }
          ]
        res.json({
            success: true,
            message: '获取数据列表成功',
            data: {
                total: tableData.length,
                page,
                pageSize,
                items: tableData
            }
        });
        console.log('获取数据成功')
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '获取数据列表失败',
            error: error.message
        });
        console.log('获取数据失败')
    }
});

// 删除多模态数据
router.delete('/:id', async (req, res) => {
    try {
        // TODO: 实现数据删除逻辑
        res.json({
            success: true,
            message: '数据删除成功'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '数据删除失败',
            error: error.message
        });
    }
});

module.exports = router;