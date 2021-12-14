/* eslint-disable eol-last */
/* eslint-disable indent */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
    // 以上兩行代碼的含意就是將svg目錄下的所有.svg文件全部引入到項目中