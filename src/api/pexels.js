import request from '@/utils/request'

export const getPexelsList = (data) => {
  return request({
    url: '/pexels/list',
    params: data
  })
}

// 获取搜索提示
export const getPexelsHint = (q) => {
  return request({
    url: '/pexels/hint',
    params: {
      q: q
    }
  })
}

// 获取主题数据
export const getThemes = () => {
  return request({
    url: '/pexels/themes'
  })
}