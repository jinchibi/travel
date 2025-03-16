import http from '../utils/http'

// 定义多模态数据的接口
export interface MultimodalData {
  id: number
  name: string
  type: string
  description: string
  createTime: string
  file?: File
}

// 定义分页查询参数接口
export interface QueryParams {
  page: number
  pageSize: number
  type?: string
  keyword?: string
}

// 定义分页返回数据接口
export interface PageResult<T> {
  mutilmodal: T[]
  total: number
}

// 多模态数据服务类
class MultimodalService {
  // 基础API路径
  private baseUrl = '/multimodal'

  /**
   * 获取多模态数据列表
   * @param params 查询参数
   * @returns 分页数据
   */
  getList(params: QueryParams) {
    const timestamp = new Date().getTime()
    return http.get<PageResult<MultimodalData>>(`${this.baseUrl}/list`, { ...params, _t: timestamp })
  }

  /**
   * 获取图片
   * @param params 查询参数
   */
  getImage(url: string) {
    const timestamp = new Date().getTime()
    return http.get(url, { _t: timestamp })
  }

  /**
   * 获取单个多模态数据详情
   * @param id 数据ID
   * @returns 数据详情
   */
  getDetail(id: number) {
    return http.get<MultimodalData>(`${this.baseUrl}/${id}`)
  }

  /**
   * 创建多模态数据
   * @param data 数据对象
   * @returns 创建结果
   */
  create(data: Partial<MultimodalData>) {
    return http.post<MultimodalData>(`${this.baseUrl}/upload`, data)
  }

  /**
   * 更新多模态数据
   * @param id 数据ID
   * @param data 更新的数据
   * @returns 更新结果
   */
  update(id: number, data: Partial<MultimodalData>) {
    // 如果包含文件，使用上传方法
    if (data.file) {
      const { file, ...rest } = data
      return http.upload<MultimodalData>(`${this.baseUrl}/${id}`, file, 'file', rest)
    }
    // 否则使用普通PUT请求
    return http.put<MultimodalData>(`${this.baseUrl}/${id}`, data)
  }

  /**
   * 删除多模态数据
   * @param id 数据ID
   * @returns 删除结果
   */
  delete(id: number) {
    return http.delete(`${this.baseUrl}/${id}`)
  }

  /**
   * 批量删除多模态数据
   * @param ids ID数组
   * @returns 删除结果
   */
  batchDelete(ids: number[]) {
    return http.post(`${this.baseUrl}/batch-delete`, { ids })
  }

  /**
   * 下载多模态数据文件
   * @param id 数据ID
   * @returns Blob数据
   */
  downloadFile(id: number) {
    return http.download(`${this.baseUrl}/${id}/download`)
  }
}

// 导出服务实例
export default new MultimodalService()
