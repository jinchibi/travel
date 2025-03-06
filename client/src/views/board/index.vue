<template>
  <div class="board-container">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in statistics" :key="index">
        <el-card class="statistic-card" :body-style="{ padding: '20px' }">
          <el-icon class="card-icon" :class="item.type">
            <component :is="item.icon" />
          </el-icon>
          <div class="card-content">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-value">{{ item.value }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>景点访问量趋势</span>
            </div>
          </template>
          <div class="chart-placeholder">图表区域</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>用户活跃度分析</span>
            </div>
          </template>
          <div class="chart-placeholder">图表区域</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Location, User, Notebook, Tickets } from '@element-plus/icons-vue'

const statistics = reactive([
  {
    title: '总景点数',
    value: '128',
    icon: Location,
    type: 'primary',
  },
  {
    title: '活跃用户',
    value: '1,234',
    icon: User,
    type: 'success',
  },
  {
    title: '笔记数量',
    value: '3,456',
    icon: Notebook,
    type: 'warning',
  },
  {
    title: '订单总数',
    value: '892',
    icon: Tickets,
    type: 'danger',
  },
])
</script>

<style scoped>
.board-container {
  padding: 20px;
}

.statistic-card {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.card-icon {
  font-size: 48px;
  margin-right: 20px;
}

.card-icon.primary {
  color: var(--el-color-primary);
}

.card-icon.success {
  color: var(--el-color-success);
}

.card-icon.warning {
  color: var(--el-color-warning);
}

.card-icon.danger {
  color: var(--el-color-danger);
}

.card-content {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.chart-row {
  margin-top: 20px;
}

.chart-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  color: #909399;
  border-radius: 4px;
}
</style>
