import { createApp } from 'vue'
import App from './App.vue'
import Probe from './lib/install'

import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

createApp(App).use(Probe).mount('#app')
