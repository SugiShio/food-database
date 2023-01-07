<template lang="pug">
input.input-password(type='password', :value='value', @input='onInput')
</template>

<script lang="ts">
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
.input-password {
  display: block;
  padding: 5px 10px;
  width: 100%;
  border: 1px solid $color-grey-weak;
  background-color: transparent;
  border-radius: 3px;
}
</style>
