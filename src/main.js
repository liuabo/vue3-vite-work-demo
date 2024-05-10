import { createApp } from 'vue'
import router, { setupRouter } from '@/router'
import './permission'

// 引入unocss css
import '@/plugins/unocss'

// 导入全局的svg图标
import '@/plugins/svgIcon'

// 引入 element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// 引入全局样式
import '@/styles/index.scss'

// 权限
import { setupAuth } from '@/directives'

import App from './App.vue'
import { setupStore } from '@/store/index.js'

import Logger from '@/utils/Logger.js'

const app = createApp(App)

setupRouter(app)
setupAuth(app)

setupStore(app)
setupElementPlus(app)

await router.isReady()

app.mount('#app')

Logger.prettyPrimary(`欢迎使用`, import.meta.env.VITE_APP_TITLE)
