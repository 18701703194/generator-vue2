<style lang="less">
  .my-com {
    color: #f63;
  }
</style>

<template>
  <div class="my-com">
    <button @click="close">隐藏子组件</button>
  </div>
</template>

<script>
  import eventBus from './event-bus'

  export default {
    data() {
      return {
      }
    },
    props: [],
    methods: {
      close: function() {
        eventBus.$emit('closeMyCom')
      }
    }
  }
</script>
