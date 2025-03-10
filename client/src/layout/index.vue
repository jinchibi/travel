<template>
  <div class="layout-container">
    <div class="header">
      <div class="title">
        <img class="icon" src="@/assets/travel-header.svg" alt="" />
        {{ title }}
      </div>
    </div>
    <div class="container">
      <el-container class="content-container">
        <el-aside class="aside">
          <el-menu
            :default-active="activeMenu"
            class="el-menu-vertical"
            @select="handleSelect"
            router
          >
            <el-menu-item index="/home/board">
              <el-icon><DataBoard /></el-icon>
              <span>控制台</span>
            </el-menu-item>
            <el-menu-item index="/home/multimodal">
              <el-icon><Files /></el-icon>
              <span>多模态数据管理</span>
            </el-menu-item>
            <el-menu-item index="/home/classification">
              <el-icon><Files /></el-icon>
              <span>数据标注</span>
            </el-menu-item>
            <el-menu-item index="/home/attractions">
              <el-icon><Location /></el-icon>
              <span>景点信息管理</span>
            </el-menu-item>
            <el-menu-item index="/home/notes">
              <el-icon><Notebook /></el-icon>
              <span>笔记管理</span>
            </el-menu-item>
            <el-menu-item index="/home/recommendation">
              <el-icon><ChatDotRound /></el-icon>
              <span>智能推荐</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <div class="main-content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  DataBoard,
  Files,
  Location,
  Notebook,
  ChatDotRound,
  TrendCharts,
  PieChart,
  Tickets,
} from '@element-plus/icons-vue'

const title = '多模态景点服务平台'
const route = useRoute()
const activeMenu = ref(route.path)

const handleSelect = (key: string) => {
  activeMenu.value = key
}
</script>

<style scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f0f2f5;
}

.header {
  height: 60px;
  background-color: #525ec3;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.header .title {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.2rem;
  color: #fff;
  height: 100%;
  margin: 0 20px;
  display: flex;
  align-items: center;
}

.header .title .icon {
  width: 23px;
  height: 23px;
  margin-right: 4px;
}

.container {
  flex: 1;
  padding: 20px;
  overflow: hidden;
  position: relative;
}

.content-container {
  height: 100%;
  background: transparent;
}

.container .aside {
  width: 220px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
  height: 100%;
  overflow-y: auto;
}

.container .main {
  background-color: #fff;
  border-radius: 10px;
  height: 100%;
  padding: 0;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.main-content {
  height: 100%;
  padding: 20px;
  overflow-y: auto;
}

.el-menu-vertical {
  border-right: none;
}

.el-menu-item {
  display: flex;
  align-items: center;
}

.el-menu-item .el-icon {
  margin-right: 8px;
}
</style>
