import axios from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import { diffTokenTime } from '@/utils/auth'
import store from '@/store'
import { options } from '@/views/users/options'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 声明一个Map用于存储每个请求的标识和取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果pending中不存在当前请求
        pending.set(url, cancel)
      }
    })
}
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  if (pending.has(url)) {
    // 如果pending中存在当前请求标识，需要取消当前请求，并移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}
/**
 * 清空pending中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    removePending(options) // 请求开始前，对之前的请求做检查取消操作
    addPending(options) // 将当前请求添加到pending中
    if (localStorage.getItem('token')) {
      if (diffTokenTime()) {
        store.dispatch('app/logout')
        return Promise.reject(new Error('token 失效了'))
      }
    }
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 在请求结束后，移除本次请求
    removePending(response)
    const { data, meta } = response.data
    if (meta.status === 200 || meta.status === 201) {
      return data
    } else {
      ElMessage.error(meta.msg)
      return Promise.reject(new Error(meta.msg))
    }
  },
  (error) => {
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(new Error(error.response.data))
  }
)
export default service
