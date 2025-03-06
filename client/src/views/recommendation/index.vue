<template>
  <div class="recommendation-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="filter-card">
          <template #header>
            <div class="card-header">
              <span>推荐条件</span>
            </div>
          </template>
          <el-form :model="filterForm" label-width="80px">
            <el-form-item label="景点类型">
              <el-select v-model="filterForm.type" placeholder="请选择景点类型" clearable>
                <el-option label="自然景观" value="nature" />
                <el-option label="历史古迹" value="history" />
                <el-option label="文化场所" value="culture" />
                <el-option label="主题乐园" value="theme" />
              </el-select>
            </el-form-item>
            <el-form-item label="预算范围">
              <el-slider
                v-model="filterForm.budget"
                :min="0"
                :max="1000"
                range
                show-stops
                :step="100"
              />
            </el-form-item>
            <el-form-item label="游玩时长">
              <el-select v-model="filterForm.duration" placeholder="请选择游玩时长" clearable>
                <el-option label="2小时以内" value="2" />
                <el-option label="2-4小时" value="4" />
                <el-option label="4-6小时" value="6" />
                <el-option label="6小时以上" value="8" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleRecommend">开始推荐</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="result-card">
          <template #header>
            <div class="card-header">
              <span>推荐结果</span>
            </div>
          </template>
          <div v-if="recommendations.length > 0" class="recommendation-list">
            <div v-for="item in recommendations" :key="item.id" class="recommendation-item">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="item.image" class="image" />
                <div class="item-content">
                  <h4>{{ item.name }}</h4>
                  <p>{{ item.description }}</p>
                  <div class="item-footer">
                    <span>¥{{ item.price }}</span>
                    <el-button type="primary" size="small">查看详情</el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
          <div v-else class="empty-result">
            <el-empty description="暂无推荐结果" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const filterForm = reactive({
  type: '',
  budget: [0, 500],
  duration: ''
})

const recommendations = ref([])

const handleRecommend = () => {
  // TODO: 实现推荐逻辑
  console.log('推荐条件：', filterForm)
}
</script>

<style scoped>
.recommendation-container {
  padding: 20px;
}

.filter-card,
.result-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recommendation-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.recommendation-item .image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.item-content {
  padding: 14px;
}

.item-content h4 {
  margin: 0;
  margin-bottom: 10px;
}

.item-content p {
  color: #666;
  font-size: 14px;
  margin: 0;
  margin-bottom: 10px;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-footer span {
  color: #f56c6c;
  font-size: 20px;
  font-weight: bold;
}

.empty-result {
  padding: 40px 0;
}
</style>