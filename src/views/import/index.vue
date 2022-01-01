<template>
  <!-- 公共导入组件 -->
  <upload-excel :on-success="success" />
</template>

<script>
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import { importEmployee } from '@/api/employees'
  export default {
  //   data() {
  //   return {
  //     type: this.$route.query.type
  //   }
  // },
  methods: {
    async  success({ header, results }) {
      // if (this.type === 'user') {
        // 如果是导入员工
          const userRelations = {
            '入职日期': 'timeOfEntry',
            '手机号': 'mobile',
            '姓名': 'username',
            '转正日期': 'correctionTime',
            '工号': 'workNumber'
          }
        //   const arr = []
        //  results.forEach(item => {
        //     const userInfo = {}
        //     Object.keys(item).forEach(key => {
        //       userInfo[userRelations[key]] = item[key]
        //     })
        //    arr.push(userInfo)
        //   })
        //   await importEmployee(arr) // 调用导入接口
        var newArr = results.map(item => {
          var userInfo = {}
          Object.keys(item).forEach(key => {
            if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
              // 後端接口 限制了 不能是字符串 要求轉化成時間類型
              userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/')) // 只有這樣 才能存入數據庫
            } else {
              userInfo[userRelations[key]] = item[key] // 將原來中文對應的值 賦值給原來英文對應的值
            }
          })
          return userInfo
        })
        await importEmployee(newArr) // 接收一個數組
        this.$message.success('導入excel成功')
      // }
        this.$router.back() // 跳回前一頁
      },
      // 轉化      excel日期格式
      formatDate(numb, format) {
        const time = new Date((numb - 1) * 24 * 3600000 + 1)
        time.setYear(time.getFullYear() - 70)
        const year = time.getFullYear() + ''
        const month = time.getMonth() + 1 + ''
        const date = time.getDate() - 1 + ''
        if (format && format.length === 1) {
          return year + format + month + format + date
        }
        return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
      }
  }
  }
</script>

<style>
/* eslint-disable eol-last */
</style>
