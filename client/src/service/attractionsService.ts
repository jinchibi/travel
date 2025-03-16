import http from "@/utils/http";

export interface QueryParams {
  page: number
  pageSize: number
  type?: string
}

export interface PageResult<T> {
  total: number
  tableData: T[]
}

export interface AttractionsData {
  id: number
  name: string
  sales: number
  rating: number
  address: string
  price: number
  introduction: string
}

class AttractionsService {
  private baseUrl = "/attractions";

  getList(params: QueryParams) {
    const timestamp = new Date().getTime();
    return http.get<PageResult<AttractionsData>>(`${this.baseUrl}/list`, {
      ...params,
      _t: timestamp,
    });
  }

  create(data: Partial<AttractionsData>) {
    return http.post<AttractionsData>(`${this.baseUrl}/upload`, data)
  }

  delete(id: number) {
    return http.delete(`${this.baseUrl}/${id}`)
  }
}

export default new AttractionsService();