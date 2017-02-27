<style lang="less">
  @import '../style.less';
  
</style>

<template>
  <div v-if="isShowPage">
    <my-com v-if="isShowMyCom"></my-com>
  </div>
</template>

<script>

import MyCom from '../components/MyCom.vue'
import eventBus from '../components/event-bus'


export default {
  data () {
    return {
      isShowPage: false,
      isShowMyCom: true,
      data: {}
    }
  },
  computed: {
  },
  mounted() {
    const self = this
    self.initData()

    eventBus.$on('closeMyCom', function () {
      self.isShowMyCom = false
    })
  },
  components: {
    MyCom
  },
  methods: {
    initData: function() {
      const self = this

      Api.getShopInfo({ shopID: self.id }).then(res => {
        if (res.code == 200) {
          self.data = res
          self.isShowPage = true
        } else {
          alert('接口出错')
        }
      })
    }
  }
}
</script>
