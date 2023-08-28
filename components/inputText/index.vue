<template lang="pug">
input.input-text(
  type='text',
  :class='size',
  :disabled='disabled',
  :value='value',
  @input='onInput',
  @change='onChange',
  @keydown.enter='$emit("keydown-enter", $event)'
)
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'InputText',
  props: {
    disabled: { type: Boolean, default: false },
    size: { type: String, default: '' },
    value: { type: String, default: '' },
  },
  methods: {
    onChange($event) {
      const value = $event.target.value
      this.$emit('change', value)
    },
    onInput($event) {
      const value = $event.target.value
      this.$emit('input', value)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';

.input-text {
  @extend %input;

  &.large {
    font-size: $font-size-large;
  }

  &[disabled] {
    color: $color-text-weak;
  }
}
</style>
