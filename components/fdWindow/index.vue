<template lang="pug">
transition(name='slidein')
  .fd-window(v-if='isShow')
    slot
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'FdWindow',
  props: {
    isShow: { type: Boolean, default: false },
  },
})
</script>

<style lang="scss" scoped>
.fd-window {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 30px 20px 50px;
  background-color: #fff;
}
.slidein-enter-active,
.slidein-leave-active {
  transition: 0.3s;
}
.slidein-enter,
.slidein-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
