import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { initI18n } from './i18n/index'

await initI18n()

createApp(App).mount('#app')