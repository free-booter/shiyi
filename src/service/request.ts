import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface InstanceInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: InstanceInterceptors<T>;
}

class Request {
  instance: AxiosInstance;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      err => err
    );

    this.instance.interceptors.response.use(
      res => res.data,
      err => err
    );

     // 实例的拦截器
    //  this.instance.interceptors.request.use(
    //   config.interceptors?.requestInterceptor,
    //   config.interceptors?.requestInterceptorCatch
    // )
    // this.instance.interceptors.response.use(
    //   config.interceptors?.responseInterceptor,
    //   config.interceptors?.responseInterceptorCatch
    // )
  }

  request<T = any>(config: RequestConfig<T>) {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    console.log('get', config);

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err: any) => {
          if (config.interceptors?.responseInterceptorCatch) {
            err = config.interceptors.responseInterceptorCatch(err)
          }
          reject(err)
        })
    })
  }

  get<T = any>(config: RequestConfig<T>) {
    
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: RequestConfig<T>) {
    return this.instance.request<T>({ ...config, method: 'POST' })
  }
  patch<T = any>(config: RequestConfig<T>) {
    return this.instance.request<T>({ ...config, method: 'PATCH' })
  }
  delete<T = any>(config: RequestConfig<T>) {
    return this.instance.request<T>({ ...config, method: 'DELETE' })
  }

}

export default Request;