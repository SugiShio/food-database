<template lang="pug">
input.input-password(type='password', :value='value', @input='onInput')
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'InputPassword',
  props: {
    value: { type: String, default: '' },
  },
  data() {
    return {
      // isShow: false,
    }
  },
  computed: {
    // todo
    // type() {
    //   return this.isShow ? 'text' : 'password'
    // },
  },
  methods: {
    onInput($event) {
      const value = $event.target.value
      this.$emit('input', value)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.input-password {
  @extend %input;
}
</style>
