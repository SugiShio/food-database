<template lang="pug">
button.fd-button(
  :class='type',
  :disabled='disabled',
  :type='typeAttribute',
  @click='$emit("button-clicked")'
) {{ label }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'FdButton',
  props: {
    disabled: { type: Boolean, default: false },
    label: { type: String, default: '' },
    typeAttribute: { type: String, default: 'button' },
    type: { type: String, default: '' },
  },
  methods: {},
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
    background-color: rgba($color-main, 0.5);
    border-color: rgba($color-main, 0.5);
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
}
</style>
