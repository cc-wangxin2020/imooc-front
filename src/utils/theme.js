import { watch } from "vue"
import store from "../store"
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "../constants"
let matchMedia
const watchSystemTheme = () => {
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}
const changeTheme = (val) => {
  let themeClassName = ''
  switch (val) {
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_SYSTEM:
      // 开始监听
      watchSystemTheme()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
  }
  document.querySelector('html').className = themeClassName
}

export default () => {
  watch(() => store.getters.themeType, changeTheme, {
    immediate: true
  })
}