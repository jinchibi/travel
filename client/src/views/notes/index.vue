<template>
  <div class="notes-container">
    <div class="header-section">
      <h2>笔记管理</h2>
      <el-button type="primary" @click="handleAdd">新建笔记</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" width="200" />
      <el-table-column prop="author" label="作者" width="120" />
      <el-table-column prop="attraction" label="关联景点" width="150" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 'published' ? 'success' : 'info'">
            {{ row.status === 'published' ? '已发布' : '草稿' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button
            link
            :type="row.status === 'published' ? 'warning' : 'success'"
            @click="handlePublish(row)"
          >
            {{ row.status === 'published' ? '取消发布' : '发布' }}
          </el-button>
          <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="70%">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入笔记标题" />
        </el-form-item>
        <el-form-item label="关联景点" prop="attraction">
          <el-select v-model="form.attraction" placeholder="请选择关联景点">
            <el-option
              v-for="item in attractions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="10"
            placeholder="请输入笔记内容"
          />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="handleImageChange"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="handleSaveDraft">保存草稿</el-button>
          <el-button type="primary" @click="handleSubmit">发布</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const loading = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('新建笔记')
const formRef = ref<FormInstance>()

const tableData = ref([
  {
    id: 1,
    title: '游玩攻略分享',
    author: '张三',
    attraction: '示例景点',
    createTime: '2024-01-15 15:00:00',
    status: 'published'
  },
  {
    id: 2,
    title: '旅行日记',
    author: '李四',
    attraction: '示例景点2',
    createTime: '2024-01-15 16:00:00',
    status: 'draft'
  }
])

const attractions = [
  { value: '1', label: '示例景点' },
  { value: '2', label: '示例景点2' }
]

const form = reactive({
  title: '',
  attraction: '',
  content: '',
  images: []
})

const rules = reactive<FormRules>({
  title: [{ required: true, message: '请输入笔记标题', trigger: 'blur' }],
  attraction: [{ required: true, message: '请选择关联景点', trigger: 'change' }],
  content: [{ required: true, message: '请输入笔记内容', trigger: 'blur' }]
})

const handleAdd = () => {
  dialogTitle.value = '新建笔记'
  dialogVisible.value = true
  Object.assign(form, {
    title: '',
    attraction: '',
    content: '',
    images: []
  })
}

const handleEdit = (row: any) => {
  dialogTitle.value = '编辑笔记'
  dialogVisible.value = true
  Object.assign(form, {
    title: row.title,
    attraction: row.attraction,
    content: row.content || ''
  })
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定要删除该笔记吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}

const handlePublish = (row: any) => {
  const action = row.status === 'published' ? '取消发布' : '发布'
  ElMessageBox.confirm(`确定要${action}该笔记吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info'
  })
    .then(() => {
      ElMessage.success(`${action}成功`)
    })
    .catch(() => {})
}

const handleImageChange = (file: any) => {
  // TODO: 实现图片上传逻辑
  ElMessage.success('图片上传成功')
}

const handleSaveDraft = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      // TODO: 实现保存草稿逻辑
      ElMessage.success('保存草稿成功')
      dialogVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      // TODO: 实现发布逻辑
      ElMessage.success(dialogTitle.value === '新建笔记' ? '发布成功' : '更新成功')
      dialogVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
.notes-container {
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