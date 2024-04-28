import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'virtual:svg-icons-register'
import '@purge-icons/generated'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
