<template>
  <div class="attractions-container">
    <div class="header-section">
      <h2>景点信息管理</h2>
      <el-button type="primary" @click="handleAdd">添加景点</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="景点名称" width="150">
        <template #default="{ row }">
          <div class="name-cell">
            <span>{{ row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" width="200" />
      <el-table-column prop="rating" label="评分" width="150">
        <template #default="{ row }">
          <el-rate v-model="row.rating" disabled text-color="#ff9900" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="门票价格" width="100">
        <template #default="{ row }">
          <span>¥{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="简介" prop="introduction" width="250" />
      <el-table-column label="操作" width="250" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="景点名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="门票价格" prop="price">
          <el-input-number v-model="form.price" :min="0" :precision="2" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.introduction" label="简介" />
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
import type { FormInstance, FormRules } from 'element-plus'

const loading = ref(false)
const dialogVisible = ref(false)
const imagesDialogVisible = ref(false)
const reviewsDialogVisible = ref(false)
const dialogTitle = ref('添加景点')
const formRef = ref<FormInstance>()

const tableData = ref([
  {
    id: 1,
    name: '示例景点',
    category: 'nature',
    address: '示例地址',
    rating: 4.5,
    price: 88,
    description: '这是一个示例景点描述'
  }
])


const form = reactive({
  name: '',
  sales: 0,
  rating: 5,
  address: '',
  price: 0,
  introduction: '',
})

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入景点名称', trigger: 'blur' }],
  category: [{ required: true, message: '请选择景点类别', trigger: 'change' }],
  address: [{ required: true, message: '请输入景点地址', trigger: 'blur' }],
  price: [{ required: true, message: '请输入门票价格', trigger: 'blur' }]
})

const handleAdd = () => {
  dialogTitle.value = '添加景点'
  dialogVisible.value = true
  Object.assign(form, {
    name: '',
    category: '',
    address: '',
    price: 0,
    description: '',
    coverImage: ''
  })
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑景点'
  dialogVisible.value = true
  Object.assign(form, row)
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定要删除该景点吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      // TODO: 实现数据提交逻辑
      ElMessage.success(dialogTitle.value === '添加景点' ? '添加成功' : '更新成功')
      dialogVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
.attractions-container {
  padding: 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cover-image {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.cover-upload {
  width: 148px;
  height: 148px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.images-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>