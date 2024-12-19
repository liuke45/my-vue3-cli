import request from '@/utils/service'

interface Req {
  apiKey: string
  area?: string
  areaID?: string
}

interface Res {
  area: string
  areaCode: string
  areaId: string
  dayList: any[]
}

export const testApi = (data: Req) => {
  return request<Req, Res>({
    url: '/api/test',
    method: 'GET',
    data,
    interceptors: {
      requestInterceptors(res) {
        return res
      },
      responseInterceptors(result) {
        return result
      },
    },
  })
}
