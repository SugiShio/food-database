<template lang="pug">
transition(name='slidein')
  .fd-window(v-if='isShow')
    button.fd-window__close-bar(@click='$emit("close-clicked")')
    slot
</template>

<script>
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
  background-color: #fff;
  border-radius: 5px;
  bottom: 0;
  box-shadow: 0 0 10px rgba(darken($color-main, 40%), 0.1);
  left: 10px;
  padding: 10px 20px 50px;
  position: fixed;
  right: 10px;
  top: 30vh;

  &__close-bar {
    display: block;
    margin: 10px auto 30px;
    width: 100px;
    height: 4px;
    border-radius: 2px;
    background-color: $color-text-weak;
  }
}
.slidein-enter-active,
.slidein-leave-active {
  transition: 0.3s;
}
.slidein-enter,
.slidein-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
