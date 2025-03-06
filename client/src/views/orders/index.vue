<template>
  <div class="orders-container">
    <el-card class="filter-card">
      <el-form :inline="true" :model="filterForm">
        <el-form-item label="订单号">
          <el-input v-model="filterForm.orderNo" placeholder="请输入订单号" clearable />
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="filterForm.status" placeholder="请选择订单状态" clearable>
            <el-option label="待支付" value="pending" />
            <el-option label="已支付" value="paid" />
            <el-option label="已完成" value="completed" />
            <el-option label="已取消" value="cancelled" />
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-date-picker
            v-model="filterForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="table-card">
      <template #header>
        <div class="card-header">
          <span>订单列表</span>
          <div class="header-actions">
            <el-button type="primary" size="small" plain @click="exportOrders">导出订单</el-button>
          </div>
        </div>
      </template>
      <el-table :data="orderList" style="width: 100%" v-loading="loading">
        <el-table-column prop="orderNo" label="订单号" width="180" />
        <el-table-column prop="productName" label="景点名称" width="200" />
        <el-table-column prop="amount" label="订单金额" width="120">
          <template #default="scope">
            <span class="amount">¥{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" width="120">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">{{ getStatusText(scope.row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="下单时间" width="180" />
        <el-table-column prop="userName" label="下单用户" width="120" />
        <el-table-column label="操作" fixed="right" width="150">
          <template #default="scope">
            <el-button link type="primary" @click="viewDetail(scope.row)">查看</el-button>
            <el-button v-if="scope.row.status === 'pending'" link type="primary" @click="handlePay(scope.row)">支付</el-button>
            <el-button v-if="scope.row.status === 'pending'" link type="danger" @click="handleCancel(scope.row)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 订单详情对话框 -->
    <el-dialog v-model="detailDialogVisible" title="订单详情" width="600px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="订单号">{{ currentOrder.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="景点名称">{{ currentOrder.productName }}</el-descriptions-item>
        <el-descriptions-item label="订单金额">¥{{ currentOrder.amount }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">{{ getStatusText(currentOrder.status) }}</el-descriptions-item>
        <el-descriptions-item label="下单时间">{{ currentOrder.createTime }}</el-descriptions-item>
        <el-descriptions-item label="下单用户">{{ currentOrder.userName }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ currentOrder.phone }}</el-descriptions-item>
        <el-descriptions-item label="游玩日期">{{ currentOrder.visitDate }}</el-descriptions-item>
        <el-descriptions-item label="游玩人数">{{ currentOrder.visitorCount }}人</el-descriptions-item>
        <el-descriptions-item label="备注">{{ currentOrder.remark || '无' }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const filterForm = reactive({
  orderNo: '',
  status: '',
  dateRange: []
})

const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const orderList = ref([])
const detailDialogVisible = ref(false)
const currentOrder = ref({})

const handleSearch = () => {
  // TODO: 实现搜索逻辑
  console.log('搜索条件：', filterForm)
}

const resetForm = () => {
  filterForm.orderNo = ''
  filterForm.status = ''
  filterForm.dateRange = []
  handleSearch()
}

const exportOrders = () => {
  // TODO: 实现导出逻辑
  ElMessage.success('订单导出成功')
}

const getStatusType = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'warning',
    paid: 'success',
    completed: 'success',
    cancelled: 'info'
  }
  return statusMap[status] || 'info'
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: '待支付',
    paid: '已支付',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status] || '未知状态'
}

const viewDetail = (row: any) => {
  currentOrder.value = row
  detailDialogVisible.value = true
}

const handlePay = (row: any) => {
  // TODO: 实现支付逻辑
  ElMessage.success('支付成功')
}

const handleCancel = (row: any) => {
  ElMessageBox.confirm('确认取消该订单吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // TODO: 实现取消逻辑
    ElMessage.success('订单已取消')
  })
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  handleSearch()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  handleSearch()
}
</script>

<style scoped>
.orders-container {
  padding: 20px;
}

.filter-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.amount {
  color: #f56c6c;
  font-weight: bold;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>