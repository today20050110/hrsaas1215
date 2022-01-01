/* eslint-disable no-multi-spaces */
/* eslint-disable indent */
/* eslint-disable eol-last */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 10800 // 定义超时时间
const service = axios.create({
        // 當執行 npm run dev => .env.development => /api => 跨域代理
        baseURL: process.env.VUE_APP_BASE_API, //  npm run dev => /api  npm run build => /prod-api
        timeout: 25000 // 設置超時時間
    })
    // 请求拦截器
service.interceptors.request.use(config => {
    // config 是请求的配置信息
    // 注入token
    if (store.getters.token) {
        // 只有在有token的情况下 才有必要去检查时间戳是否超时
        if (IsCheckTimeOut()) {
            // 如果它为true表示 过期了
            // token没用了 因为超时了
            store.dispatch('user/logout') // 登出操作
                // 跳转到登录页
            router.push('/login')
            return Promise.reject(new Error('token超時了'))
        }
        config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config // 必须要返回的
}, error => {
    return Promise.reject(error)
})
service.interceptors.response.use(response => {
        // axios默認加了一層data
        const { success, message, data } = response.data
            // 要根據success成功與否決定下面的操作
        if (success) {
            return data
        } else {
            // 業務已經錯誤了 還能進then ? 不能!  應該進catch
            Message.error(message) // 提示錯誤消息
            return Promise.reject(new Error(message))
        }
    }, error => {
        // error 信息 里面 response的对象
        if (error.response && error.response.data && error.response.data.code === 10002) {
            // 当等于10002的时候 表示 后端告诉我token超时了
            store.dispatch('user/logout') // 登出action 删除token
            router.push('/login')
        } else {
            Message.error(error.message) // 提示错误信息
        }
        return Promise.reject(error) // 返回執行錯誤 讓當前的執行鏈 跳出成功 直接進入catch
    })
    // 是否超时
    // 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
    var currentTime = Date.now() // 当前时间戳
    var timeStamp = getTimeStamp() // 缓存时间戳
    return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service