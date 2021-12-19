/* eslint-disable no-multi-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable eol-last */
import { setToken, getToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
// 狀態
const state = {
    token: getToken() // 設置token為共享狀態 初始化vuex的時候 就先重緩存中讀取
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
    }
}

const actions = {
    async login(context, data) {
        // 調用api接口
        const result = await login(data)
        context.commit('setToken', result)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}