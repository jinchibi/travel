<template>
  <div class="multimodal-container">
    <div class="header-section">
      <h2>多模态数据管理</h2>
      <el-button type="primary" @click="handleAdd">添加数据</el-button>
    </div>
    <el-table :data="paginatedData" style="width: 100%" v-loading="loading">
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

    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

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
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import multimodalService from '@/service/multimodalService'

const loading = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('添加数据')

// 分页相关变量
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 数据列表
const tableData = ref<any[]>([])

// 计算当前页的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return tableData.value.slice(start, end)
})

// 初始化数据
onMounted(() => {
  fetchData()
})

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
    .then(async () => {
      loading.value = true
      try {
        await multimodalService.delete(row.id)
        ElMessage.success('删除成功')
        fetchData() // 刷新数据
      } catch (error) {
        console.error('删除失败', error)
      } finally {
        loading.value = false
      }
    })
    .catch(() => {
      // 取消删除
    })
}

const handleFileChange = (file: any) => {
  form.file = file
}

const handleSubmit = async () => {
  if (!form.name || !form.type) {
    ElMessage.warning('请填写必要信息')
    return
  }

  loading.value = true
  try {
    if (dialogTitle.value === '添加数据') {
      await multimodalService.create(form)
      ElMessage.success('添加成功')
    } else {
      await multimodalService.update(form.id, form)
      ElMessage.success('更新成功')
    }
    dialogVisible.value = false
    fetchData() // 刷新数据
  } catch (error) {
    console.error('提交数据失败', error)
  } finally {
    loading.value = false
  }
}

// 处理页码大小变化
const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchData()
}

// 处理当前页变化
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchData()
}

// 获取数据函数
const fetchData = async () => {
  loading.value = true
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value
    }
    const res = await multimodalService.getList(params)
    console.log(res)
    // 修改这里，正确处理服务器返回的数据结构
    if (res.success) {
      tableData.value = res.data.items
      total.value = res.data.total
    } else {
      ElMessage.error(res.message || '获取数据失败')
    }
  } catch (error) {
    console.error('获取数据失败', error)
    ElMessage.error('获取数据失败')
    total.value = tableData.value.length
  } finally {
    loading.value = false
  }
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

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
