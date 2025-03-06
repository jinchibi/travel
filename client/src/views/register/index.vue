<template>
  <div class="register-container">
    <el-form :model="registerForm" :rules="rules" ref="registerFormRef" class="register-form">
      <h2>注册</h2>
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input v-model="registerForm.confirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegister" class="register-button">注册</el-button>
        <el-button @click="goToLogin" class="login-button">返回登录</el-button>
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
const registerFormRef = ref<FormInstance>()

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' }
  ]
})

const handleRegister = async () => {
  if (!registerFormRef.value) return
  await registerFormRef.value.validate((valid, fields) => {
    if (valid) {
      // TODO: 实现注册逻辑
      ElMessage.success('注册成功')
      router.push('/login')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.register-form {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.register-form h2 {
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

.register-button {
  width: 100%;
  margin-bottom: 10px;
}

.login-button {
  width: 100%;
}
</style>
