
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const baseUrl = "http://127.0.0.1:8080"   //后端地址
// const baseUrl = "http://127.0.0.1:4523/m1/4213038-0-default"  // mock地址

app.config.globalProperties.$baseUrl = baseUrl;

app.use(ElementPlus, { locale: zhCn, })
app.use(router)
app.mount('#app')
