/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import * as directives from '@/directives'
import '@/icons' // icon
import '@/permission' // permission control
import Component from '@/components'
import * as filters from '@/filters' // 引入工具类
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
    // 如果想要中文版 element-ui，按如下方式声明
    // Vue.use(ElementUI)
    // for in
Object.keys(directives).forEach(key => {
        Vue.directive(key, directives[key]) // 註冊自訂義指令
    })
    // 注册全局的过滤器
Object.keys(filters).forEach(key => {
    // 注册过滤器
    Vue.filter(key, filters[key])
})
Vue.use(Component) // 注册自己的插件
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})