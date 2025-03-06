<template>
  <div class="analysis-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="filter-card">
          <template #header>
            <div class="card-header">
              <span>数据筛选</span>
            </div>
          </template>
          <el-form :model="filterForm" :inline="true">
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="filterForm.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item label="数据类型">
              <el-select v-model="filterForm.dataType" placeholder="请选择数据类型">
                <el-option label="访问量" value="visits" />
                <el-option label="订单量" value="orders" />
                <el-option label="收入" value="revenue" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleAnalyze">分析</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>趋势分析</span>
            </div>
          </template>
          <div class="chart-container">
            <!-- 趋势图表占位 -->
            <div class="chart-placeholder">
              <el-empty description="暂无数据" />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>分布分析</span>
            </div>
          </template>
          <div class="chart-container">
            <!-- 分布图表占位 -->
            <div class="chart-placeholder">
              <el-empty description="暂无数据" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="data-card">
          <template #header>
            <div class="card-header">
              <span>数据明细</span>
            </div>
          </template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="visits" label="访问量" width="180" />
            <el-table-column prop="orders" label="订单量" width="180" />
            <el-table-column prop="revenue" label="收入" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const filterForm = reactive({
  dateRange: [],
  dataType: ''
})

const tableData = ref([])

const handleAnalyze = () => {
  // TODO: 实现数据分析逻辑
  console.log('分析条件：', filterForm)
}
</script>

<style scoped>
.analysis-container {
  padding: 20px;
}

.filter-card,
.chart-card,
.data-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-row {
  margin-top: 20px;
}

.chart-container {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}
</style>