/* eslint-disable object-curly-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable eol-last */
import { setToken, getToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// 狀態
const state = {
    token: getToken(), // 設置token為共享狀態 初始化vuex的時候 就先重緩存中讀取
    userInfo: {} // 定义一个空的对象 不是null 因为后边我要开发userInfo的属性给别人用  userInfo.name
}

const mutations = {
    setToken(state, token) {
        state.token = token // 將數據設置給vuex
            // 同步給緩存
        setToken(token)
    },
    removeToken(state) {
        state.token = null // 將vuex的數據置空
        removeToken() //  同步到緩存
    },
    // 設置用戶信息
    setUserInfo(state, result) {
        // 更新一個對象
        state.userInfo = result // 這樣是響應式
            // state.userInfo = { ...result }  這樣也是響應式 屬於淺拷貝
            // state.userInfo['username'] = result  這樣才不是響應式
    },
    // 刪除用戶信息
    removeUserInfo(state) {
        state.userInfo = {}
    }
}

const actions = {
    async login(context, data) {
        // 調用api接口
        const result = await login(data)
        context.commit('setToken', result)
            // 拿到token說明登陸成功
        setTimeStamp() // 設置當前的時間戳
    },
    async getUserInfo(context) {
        const result = await getUserInfo()
            // 獲取用戶的詳情數據
        const baseInfo = await getUserDetailById(result.userId)
        context.commit('setUserInfo', {...result, ...baseInfo }) // 合併數據後 再提交到mutations
        return result // 為什麼要return  這裡是給我們後期做權限的時候 留下的伏筆
    },
    // 登出操作
    logout(context) {
        // 刪除token
        context.commit('removeToken')
            // 刪除用戶資料
        context.commit('removeUserInfo')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}