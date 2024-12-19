import { createApp } from 'vue'
import '@/styles/reset.css'
import '@/styles/tailwindcss.css'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(router).use(store).mount('#app')
