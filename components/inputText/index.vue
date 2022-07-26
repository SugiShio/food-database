<template lang="pug">
input.input-text(type='text', :class='size', :value='value', @input='onInput')
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'InputText',
  props: {
    size: { type: String, default: '' },
    value: { type: String, default: '' },
  },
  methods: {
    onInput($event: Event) {
      const value = ($event.target as HTMLInputElement).value
      this.$emit('input', value)
    },
  },
})
</script>

<style lang="scss" scoped>
.input-text {
  display: block;
  padding: 5px 10px;
  width: 100%;
  border: 1px solid $color-grey-weak;
  background-color: transparent;
  border-radius: 3px;

  &.large {
    font-size: $font-size-large;
  }
}
</style>
