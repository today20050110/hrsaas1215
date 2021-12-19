/* eslint-disable indent */
/* eslint-disable eol-last */
// 權限攔截在路由跳轉 導航守衛
import router from '@/router'
import store from '@/store' // 引入store實例 和組件中的this.$store是一回事
import NProgress from 'nprogress' // 引入進度條
import 'nprogress/nprogress.css' // 引入進度條樣式表

// 不需要導出 只需要讓代碼執行即可
// 前置守衛
// next是前置守衛必須執行的鉤子 next必須執行如果不執行 頁面就死了
// next 放過
// next(false)跳轉中止
// next(地址)跳轉到某個地址
const whiteList = ['/login', '/404'] // 定義白名單
router.beforeEach((to, from, next) => {
        NProgress.start() // 開啟進度條的意思
        if (store.getters.token) {
            // 如果有token
            if (to.path === '/login') {
                // 如果要訪問的是 登錄頁
                next('/') // 跳到主頁
            } else {
                next()
            }
        } else {
            // 沒有 token的情況下
            if (whiteList.indexOf(to.path) > -1) {
                // 表示要去的地址在白名單
                next()
            } else {
                next('/login')
            }
        }
        NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
    })
    // 後置守衛
router.afterEach(() => {
    NProgress.done() // 關閉進度條
})