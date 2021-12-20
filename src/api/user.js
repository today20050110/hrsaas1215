/* eslint-disable indent */
/* eslint-disable eol-last */
/* eslint-disable no-unused-vars */
import request from '@/utils/request'
// 登錄接口封裝
export function login(data) {
    // 返回一個promise對象
    return request({
        url: '/sys/login',
        method: 'post',
        data
    })
}
// 獲取用戶資料接口
export function getUserInfo(token) {
    return request({
        url: '/sys/profile',
        method: 'post'
    })
}
// 根據用戶ID 獲取用戶詳情 主要是為了獲取頭像
export function getUserDetailById(id) {
    return request({
        url: `/sys/user/${id}`
    })
}
export function logout() {

}