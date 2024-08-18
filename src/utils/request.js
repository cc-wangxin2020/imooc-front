import axios from "axios";
import { message as errMessage } from '@/libs'
import store from "../store";
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  config.headers.icode = 'helloqianduanxunlianying'
  return config
})
service.interceptors.response.use(
  response => {
    const { data, message, success } = response.data
    if (success) {
      return data
    } else {
      errMessage('error', message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    if (error.response && error.response.data && error.response.data.code === 401) {
      errMessage('error', 'token超时')
      store.dispatch('user/logout')
    }
    errMessage('error', error)
    return Promise.reject(new Error(error))
  })
export default service