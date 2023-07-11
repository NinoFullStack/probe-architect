import { createApp } from 'vue'
import App from './App.vue'
import Probe from './lib/install'
import jQuery from 'jquery'

import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const $ = jQuery
window.$ = $

createApp(App).use(Probe).mount('#app')
