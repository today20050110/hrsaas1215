/* eslint-disable no-multi-spaces */
/* eslint-disable indent */
/* eslint-disable eol-last */
import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
    // 當執行 npm run dev => .env.development => /api => 跨域代理
    baseURL: process.env.VUE_APP_BASE_API, //  npm run dev => /api  npm run build => /prod-api
    timeout: 5000 // 設置超時時間
})
service.interceptors.request.use()
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
    Message.error(error.message) // 提示錯誤信息
    return Promise.reject(error) // 返回執行錯誤 讓當前的執行鏈 跳出成功 直接進入catch
})
export default service