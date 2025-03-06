<template>
  <div class="multimodal-container">
    <div class="header-section">
      <h2>多模态数据管理</h2>
      <el-button type="primary" @click="handleAdd">添加数据</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="数据名称" width="120" />
      <el-table-column prop="type" label="数据类型" width="120">
        <template #default="{ row }">
          <el-tag :type="getTagType(row.type)">{{ row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button link type="primary" @click="handlePreview(row)">预览</el-button>
          <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="数据名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="数据类型">
          <el-select v-model="form.type" placeholder="请选择数据类型">
            <el-option label="图片" value="image" />
            <el-option label="视频" value="video" />
            <el-option label="音频" value="audio" />
            <el-option label="文本" value="text" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
        <el-form-item label="上传文件">
          <el-upload
            class="upload-demo"
            action="#"
            :auto-upload="false"
            :on-change="handleFileChange"
          >
            <el-button type="primary">选择文件</el-button>
            <template #tip>
              <div class="el-upload__tip">
                支持图片、视频、音频和文本文件
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('添加数据')

const tableData = ref([
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
  }
])

const form = reactive({
  name: '',
  type: '',
  description: '',
  file: null
})

const getTagType = (type: string) => {
  const typeMap: Record<string, string> = {
    image: 'success',
    video: 'warning',
    audio: 'info',
    text: ''
  }
  return typeMap[type] || ''
}

const handleAdd = () => {
  dialogTitle.value = '添加数据'
  dialogVisible.value = true
  Object.assign(form, {
    name: '',
    type: '',
    description: '',
    file: null
  })
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑数据'
  dialogVisible.value = true
  Object.assign(form, {
    name: row.name,
    type: row.type,
    description: row.description
  })
}

const handlePreview = (row: any) => {
  ElMessage.info('预览功能开发中')
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定要删除这条数据吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage.success('删除成功')
    })
    .catch(() => {
      // 取消删除
    })
}

const handleFileChange = (file: any) => {
  form.file = file
}

const handleSubmit = () => {
  if (!form.name || !form.type) {
    ElMessage.warning('请填写必要信息')
    return
  }
  // TODO: 实现数据提交逻辑
  ElMessage.success(dialogTitle.value === '添加数据' ? '添加成功' : '更新成功')
  dialogVisible.value = false
}
</script>

<style scoped>
.multimodal-container {
  padding: 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>