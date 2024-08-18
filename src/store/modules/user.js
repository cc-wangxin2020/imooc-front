import { login, getProfile, register } from "@/api/sys"
import { message } from '@/libs'
import md5 from "md5"
export default {
  namespaced: true,
  state: () => ({
    token: '',
    userInfo: {}
  }),
  mutations: {
    setToken: (state, newToken) => {
      state.token = newToken
    },
    setUserInfo: (state, data) => {
      state.userInfo = data
    }
  },
  actions: {
    async login(context, payload) {
      const { password } = payload
      const data = await login({
        ...payload,
        password: password ? md5(password) : ''
      })
      context.commit('setToken', data.token)
      context.dispatch('profile')
    },
    async profile(context, payload) {
      const data = await getProfile()
      context.commit('setUserInfo', data)
      message('success', '登陆成功')
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      location.reload()
    },
    async register(context, payload) {
      const { password } = payload
      return await register({
        ...payload,
        password: md5(password)
      })
    }
  }
}