<template>
  <div class="classification-container">
    <!-- 左侧分类规则配置区 -->
    <div class="rules-section">
      <h3>分类规则配置</h3>
      <el-form :model="ruleForm" label-width="100px">
        <el-form-item label="景点类型">
          <el-select v-model="ruleForm.attractionType" multiple placeholder="选择景点类型">
            <el-option label="自然景观" value="natural" />
            <el-option label="人文景观" value="cultural" />
            <el-option label="历史遗迹" value="historical" />
            <el-option label="休闲娱乐" value="entertainment" />
          </el-select>
        </el-form-item>
        <el-form-item label="数据模态">
          <el-select v-model="ruleForm.modalType" multiple placeholder="选择数据模态">
            <el-option label="图片" value="image" />
            <el-option label="视频" value="video" />
            <el-option label="音频" value="audio" />
            <el-option label="文本" value="text" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容主题">
          <el-select v-model="ruleForm.contentTheme" multiple placeholder="选择内容主题">
            <el-option label="风景" value="scenery" />
            <el-option label="美食" value="food" />
            <el-option label="文化" value="culture" />
            <el-option label="活动" value="activity" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="applyRules">应用规则</el-button>
          <el-button @click="resetRules">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 右侧数据展示与标注区 -->
    <div class="data-section">
      <div class="operation-bar">
        <el-button-group>
          <el-button type="primary" @click="startManualLabeling">手动标注</el-button>
          <el-button type="success" @click="startAutoLabeling">自动标注</el-button>
          <el-button @click="openTagManager">标签管理</el-button>
        </el-button-group>
      </div>

      <el-table :data="dataList" style="width: 100%" v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="数据名称" width="120" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="getTagType(row.type)">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签" show-overflow-tooltip>
          <template #default="{ row }">
            <el-tag
              v-for="tag in row.tags"
              :key="tag"
              class="mx-1"
              closable
              @close="removeTag(row, tag)"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="addTag(row)">添加标签</el-button>
            <el-button link type="primary" @click="previewData(row)">预览</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 标签管理对话框 -->
    <el-dialog v-model="tagManagerVisible" title="标签管理" width="40%">
      <div class="tag-manager">
        <div class="tag-input">
          <el-input
            v-model="newTag"
            placeholder="输入新标签"
            @keyup.enter="addNewTag"
          >
            <template #append>
              <el-button @click="addNewTag">添加</el-button>
            </template>
          </el-input>
        </div>
        <div class="tag-list">
          <el-tag
            v-for="tag in tagList"
            :key="tag"
            class="mx-1 mb-2"
            closable
            @close="deleteTag(tag)"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 分类规则表单
const ruleForm = reactive({
  attractionType: [],
  modalType: [],
  contentTheme: []
})

// 数据列表
const loading = ref(false)
const dataList = ref([
  {
    id: 1,
    name: '景区图片1',
    type: 'image',
    tags: ['自然景观', '风景']
  },
  {
    id: 2,
    name: '景区视频1',
    type: 'video',
    tags: ['文化', '活动']
  }
])

// 标签管理
const tagManagerVisible = ref(false)
const newTag = ref('')
const tagList = ref(['自然景观', '人文景观', '历史遗迹', '风景', '美食', '文化', '活动'])

// 应用分类规则
const applyRules = () => {
  loading.value = true
  // 模拟API调用
  setTimeout(() => {
    ElMessage.success('规则应用成功')
    loading.value = false
  }, 1000)
}

// 重置规则
const resetRules = () => {
  Object.keys(ruleForm).forEach(key => {
    ruleForm[key] = []
  })
}

// 开始手动标注
const startManualLabeling = () => {
  ElMessage.info('进入手动标注模式')
}

// 开始自动标注
const startAutoLabeling = () => {
  loading.value = true
  // 模拟自动标注过程
  setTimeout(() => {
    ElMessage.success('自动标注完成')
    loading.value = false
  }, 2000)
}

// 打开标签管理器
const openTagManager = () => {
  tagManagerVisible.value = true
}

// 添加新标签
const addNewTag = () => {
  if (newTag.value && !tagList.value.includes(newTag.value)) {
    tagList.value.push(newTag.value)
    newTag.value = ''
    ElMessage.success('标签添加成功')
  }
}

// 删除标签
const deleteTag = (tag: string) => {
  const index = tagList.value.indexOf(tag)
  if (index > -1) {
    tagList.value.splice(index, 1)
    ElMessage.success('标签删除成功')
  }
}

// 为数据添加标签
const addTag = (row: any) => {
  // 实现添加标签的逻辑
  ElMessage.info('添加标签功能待实现')
}

// 从数据中移除标签
const removeTag = (row: any, tag: string) => {
  const index = row.tags.indexOf(tag)
  if (index > -1) {
    row.tags.splice(index, 1)
    ElMessage.success('标签移除成功')
  }
}

// 预览数据
const previewData = (row: any) => {
  // 实现数据预览逻辑
  ElMessage.info('预览功能待实现')
}

// 获取标签类型
const getTagType = (type: string) => {
  const types = {
    image: '',
    video: 'success',
    audio: 'warning',
    text: 'info'
  }
  return types[type] || ''
}
</script>

<style scoped>
.classification-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  height: calc(100vh - 100px);
}

.rules-section {
  flex: 0 0 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.data-section {
  flex: 1;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.operation-bar {
  margin-bottom: 20px;
}

.tag-manager .tag-input {
  margin-bottom: 20px;
}

.tag-manager .tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.mx-1 {
  margin: 0 4px;
}

.mb-2 {
  margin-bottom: 8px;
}
</style>