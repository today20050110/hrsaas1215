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

export function getInfo(token) {

}

export function logout() {

}