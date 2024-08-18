import router from './router'
import store from './store'
import { message } from '@/libs'

router.beforeEach((to, from, next) => {
  // 白名单
  if (!to.meta.user) {
    next()
    return
  }
  // 用户已登录
  if (store.getters.token) {
    next()
    return
  }
  message('warn', '登录失效，请重新登录！');
  next('/')
})