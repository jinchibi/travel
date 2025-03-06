<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="rules" ref="loginFormRef" class="login-form">
      <h3 class="title">登录</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin" class="login-button">登录</el-button>
        <el-button @click="goToRegister" class="register-button">注册账号</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

const router = useRouter()
const loginFormRef = ref<FormInstance>()

const loginForm = reactive({
  username: '',
  password: '',
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
  ],
})

const handleLogin = async () => {
  if (!loginFormRef.value) return
  await loginFormRef.value.validate((valid, fields) => {
    if (valid) {
      // TODO: 实现登录逻辑
      ElMessage.success('登录成功')
      router.push('/home/board')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.login-button {
  width: 100%;
  margin-bottom: 10px;
}

.register-button {
  width: 100%;
}
</style>
