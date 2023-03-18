import { createApp } from 'vue'
import App from './App.vue'
import router from '~/router'
import ElementPlus from 'element-plus'
import mavonEditor from 'mavon-editor'

import 'mavon-editor/dist/css/index.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(mavonEditor)
app.use(ElementPlus)
app.use(router)
app.mount('#app')