/* eslint-disable indent */
/* eslint-disable eol-last */
// 負責管理所有的自訂義指令

export const imagerror = {
    // 指令對象 會在當前的dom元素插入到節點之後執行
    inserted(dom, options) {
        // options是指令中的變量的解釋 其中有一個屬性叫 value
        // dom 表示當前指令作用的dom對象
        // dom認為此時就是圖片
        // 當圖片有地址 但圖片沒有加載成功的時候 會報錯 會觸發圖片的一個事件 => onerror
        dom.onerror = function() {
            // 當圖片出現異常的時候 會將指令配置的默認圖片設置為該圖片的內容
            // dom可以註冊error事件
            dom.src = options.value // 這裡不能寫死
        }
    }
}

//  <img v-imagerror="img"   />
//  data() { return { img: 'a.png' } }