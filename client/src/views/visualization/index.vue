<template>
  <div class="visualization-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="control-card">
          <template #header>
            <div class="card-header">
              <span>可视化控制</span>
            </div>
          </template>
          <el-form :model="controlForm" label-width="80px">
            <el-form-item label="图表类型">
              <el-select v-model="controlForm.chartType" placeholder="请选择图表类型">
                <el-option label="柱状图" value="bar" />
                <el-option label="折线图" value="line" />
                <el-option label="饼图" value="pie" />
                <el-option label="散点图" value="scatter" />
              </el-select>
            </el-form-item>
            <el-form-item label="数据维度">
              <el-select v-model="controlForm.dimension" placeholder="请选择数据维度" multiple>
                <el-option label="时间" value="time" />
                <el-option label="地区" value="region" />
                <el-option label="类型" value="type" />
                <el-option label="指标" value="metric" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleVisualize">生成图表</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>可视化图表</span>
              <div class="chart-actions">
                <el-button-group>
                  <el-button size="small" type="primary" plain>下载</el-button>
                  <el-button size="small" type="primary" plain>分享</el-button>
                </el-button-group>
              </div>
            </div>
          </template>
          <div class="chart-container">
            <div v-if="!hasChartData" class="chart-placeholder">
              <el-empty description="请选择数据维度生成图表" />
            </div>
            <!-- 图表将在这里渲染 -->
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="data-row">
      <el-col :span="24">
        <el-card class="data-card">
          <template #header>
            <div class="card-header">
              <span>数据列表</span>
              <el-button type="primary" size="small" plain>导出数据</el-button>
            </div>
          </template>
          <el-table :data="tableData" style="width: 100%" height="300">
            <el-table-column type="index" width="50" />
            <el-table-column prop="date" label="日期" width="120" />
            <el-table-column prop="region" label="地区" width="120" />
            <el-table-column prop="type" label="类型" width="120" />
            <el-table-column prop="value" label="数值" width="120" />
            <el-table-column prop="description" label="描述" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const controlForm = reactive({
  chartType: '',
  dimension: []
})

const hasChartData = ref(false)
const tableData = ref([])

const handleVisualize = () => {
  // TODO: 实现可视化逻辑
  console.log('可视化配置：', controlForm)
}
</script>

<style scoped>
.visualization-container {
  padding: 20px;
}

.control-card,
.chart-card,
.data-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  height: 500px;
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

.data-row {
  margin-top: 20px;
}

.chart-actions {
  display: flex;
  gap: 10px;
}
</style>