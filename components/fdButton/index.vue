<template lang="pug">
button.fd-button(
  :class='[size, type]',
  :disabled='disabled',
  :type='typeAttribute',
  @click='$emit("button-clicked")'
) {{ label }}
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'FdButton',
  props: {
    disabled: { type: Boolean, default: false },
    label: { type: String, default: '' },
    size: { type: String, default: 'medium' },
    typeAttribute: { type: String, default: 'button' },
    type: { type: String, default: '' },
  },
})
</script>

<style lang="scss" scoped>
.fd-button {
  border-radius: 3px;
  border: 1px solid $color-main;
  background-color: $color-main;
  padding: 5px 10px;
  color: #fff;
  transition: background-color 0.3s;

  &:hover {
    border-color: rgba($color-main, 0.7);
    background-color: rgba($color-main, 0.7);
  }

  &[disabled],
  &[disabled]:hover {
    background-color: $color-grey;
    border-color: $color-grey;
    cursor: default;
  }

  &.secondary {
    background-color: transparent;
    color: $color-main;

    &:hover {
      background-color: rgba($color-main, 0.1);
      border-color: rgba($color-main, 0.1);
    }
  }

  &.large {
    padding: 10px 15px;
  }
}
</style>
