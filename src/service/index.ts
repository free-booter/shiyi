import Request from './request'
import { BASE_URL, TIME_OUT } from './config'
import { localCache } from '@/utils/cache'

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token && config.headers) {
        typeof config.headers.set === 'function' &&
          config.headers.set('Authorization', `Bearer ${token}`)
      }
      return config
    }
  }
})

export default request
