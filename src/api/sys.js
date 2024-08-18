import request from '@/utils/request'

// 人类行为验证
export const postChapche = (data) => {
  return request({
    url: '/sys/captcha',
    method: 'POST',
    data
  })
}

// 登录操作
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 获取用户信息

export const getProfile = () => {
  return request({
    url: '/user/profile'
  })
}

// 注册
export const register = (data) => {
  return request({
    url: '/sys/register',
    method: 'POST',
    data
  })
}

// 修改用户信息
export const putProfile = (data) => {
  return request({
    url: '/user/profile',
    method: 'PUT',
    data
  })
}

// 获取oss上传凭证
export const getSts = () => {
  return request({
    url: '/user/sts'
  })
}