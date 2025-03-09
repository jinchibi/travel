import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'

// 定义接口返回数据的类型
export interface ResponseData<T = any> {
  code: number
  data: T
  message: string
}

// 创建自定义配置的axios实例
class HttpRequest {
  // axios实例
  private instance: AxiosInstance
  // 基础配置，包含请求超时时间、请求基础URL等
  private baseConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }

  constructor(config: AxiosRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config))

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 在请求发送前做一些处理，例如添加token
        const token = localStorage.getItem('token')
        if (token) {
          config.headers = config.headers || {}
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      (error: AxiosError) => {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 对响应数据做点什么
        const { data } = response

        // 根据服务器返回的success字段判断请求是否成功
        if (data.success === true) {
          // 请求成功
          return data
        } else {
          // 处理业务错误
          ElMessage.error(data.message || '请求失败')
          return Promise.reject(new Error(data.message || '请求失败'))
        }
      },
      (error: AxiosError) => {
        // 处理HTTP网络错误
        let message = ''
        // HTTP 状态码
        const status = error.response?.status
        switch (status) {
          case 400:
            message = '请求错误'
            break
          case 401:
            message = '未授权，请重新登录'
            // 这里可以做清空storage并跳转到登录页的操作
            // localStorage.clear()
            // window.location.href = '/login'
            break
          case 403:
            message = '拒绝访问'
            break
          case 404:
            message = '请求地址出错'
            break
          case 408:
            message = '请求超时'
            break
          case 500:
            message = '服务器内部错误'
            break
          case 501:
            message = '服务未实现'
            break
          case 502:
            message = '网关错误'
            break
          case 503:
            message = '服务不可用'
            break
          case 504:
            message = '网关超时'
            break
          case 505:
            message = 'HTTP版本不受支持'
            break
          default:
            message = '网络连接故障'
        }

        ElMessage.error(message)
        return Promise.reject(error)
      }
    )
  }

  // 定义请求方法

  // GET请求
  public get<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    return this.instance.get(url, { params, ...config })
  }

  // POST请求
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    return this.instance.post(url, data, config)
  }

  // PUT请求
  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    return this.instance.put(url, data, config)
  }

  // DELETE请求
  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    return this.instance.delete(url, config)
  }

  // 上传文件
  public upload<T = any>(
    url: string,
    file: File,
    filename = 'file',
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    const formData = new FormData()
    formData.append(filename, file)

    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }

    return this.instance.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(config?.headers || {})
      }
    })
  }

  // 下载文件
  public download(url: string, params?: any, config?: AxiosRequestConfig): Promise<Blob> {
    return this.instance.get(url, {
      params,
      ...config,
      responseType: 'blob'
    })
  }
}

// 导出默认实例
export default new HttpRequest({})
