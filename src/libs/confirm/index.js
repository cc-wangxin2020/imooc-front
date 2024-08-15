import { h, render } from "vue"
import comfirmComponent from './index.vue'

export const confirm = (title, content, confirmText, cancelText) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title
      title = ''
    }
    const confirmHandler = () => {
      resolve(123)
    }
    const cancelHandler = () => {
      reject(new Error('取消了'))
    }
    const close = () => {
      render(null, document.body)
    }
    const vnode = h(comfirmComponent, {
      title, content, confirmText, cancelText, confirmHandler, cancelHandler, close
    })
    render(vnode, document.body)
  })
}