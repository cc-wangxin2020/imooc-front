import { createApp } from 'vue'
import '@/style.css'
import App from './App.vue'
import '@/styles/index.scss'
import router from './router'
import { useREM } from '@/utils/flexible'
import mLibs from './libs'
import mDirectives from './directives'
import 'virtual:svg-icons-register'
import store from './store'
import initTheme from './utils/theme'
useREM()
initTheme()
createApp(App).use(mLibs).use(mDirectives).use(store).use(router).mount('#app')
