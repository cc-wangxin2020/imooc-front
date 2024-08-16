import { h, render } from 'vue'
import messageComment from './index.vue'
export const message = (type, content, duration = 1000) => {
  const onDestory = () => {
    render(null, document.body)
  }
  const vnode = h(messageComment, {
    type,
    content,
    duration,
    destroy: onDestory
  })
  render(vnode, document.body)
}