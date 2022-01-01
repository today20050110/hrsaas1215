<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- <page-tools :show-before="true"> -->
    <!-- 兩種slot寫法 slot="after" 加template v-slot:before -->
    <!-- <template v-slot:before>
        <span>123</span>
      </template>
      <el-button slot="after" type="primary">導入 execl</el-button>
    </page-tools> -->
    <!-- <upload-excel /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
