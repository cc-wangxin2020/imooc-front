import { createApp } from 'vue'
import '@/style.css'
import App from './App.vue'
import '@/styles/index.scss'
import router from './router'
import { useREM } from '@/utils/flexible'
import mLibs from './libs'
import 'virtual:svg-icons-register'
useREM()
createApp(App).use(mLibs).use(router).mount('#app')
