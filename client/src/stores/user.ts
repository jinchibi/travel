import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义用户信息接口
export interface UserInfo {
  id: number
  userName: string
  password: string
  // email: string
  // token?: string
}

// 创建用户存储
export const useUserStore = defineStore('user', () => {
  // 用户信息，初始为null
  const userInfo = ref<UserInfo | null>(null)

  // 从localStorage初始化用户信息
  const initUserInfo = () => {
    const storedUser = localStorage.getItem('userInfo')
    if (storedUser) {
      userInfo.value = JSON.parse(storedUser)
    }
    // 测试demo
    userInfo.value = {
      id: 1,
      userName: 'bjc',
      password: '123456',
    }
  }

  // 设置用户信息
  const setUserInfo = (user: UserInfo) => {
    userInfo.value = user
    // 同时保存到localStorage
    localStorage.setItem('userInfo', JSON.stringify(user))
  }

  // 清除用户信息
  const clearUserInfo = () => {
    userInfo.value = null
    localStorage.removeItem('userInfo')
  }

  // 获取用户ID
  const getUserId = (): number | undefined => {
    return userInfo.value?.id
  }

  // 初始化
  initUserInfo()

  return { userInfo, setUserInfo, clearUserInfo, getUserId }
})
