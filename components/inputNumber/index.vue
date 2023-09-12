<template lang="pug">
.input-number
  textarea.input-number__input(
    type='number',
    :class='size',
    :value='value',
    :rows=1,
    @focus='onFocus',
    @change='$emit("change", $event.target.value)',
    @input='$emit("input", $event.target.value)',
    @keydown.enter.prevent='$emit("enter")'
  )
  span.input-number__unit {{ unit }}
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'InputNumber',
  props: {
    unit: { type: String, default: '' },
    size: { type: String, default: '' },
    value: { type: [String, Number], default: 0 },
  },
  methods: {
    onFocus($event) {
      $event.target.select()
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.input-number {
  display: flex;
  align-items: center;
  border: 1px solid $color-grey-weak;
  background-color: transparent;
  border-radius: 3px;

  &__input {
    @extend %input;
    display: block;
    flex-grow: 1;
    width: 100%;
    border: none;
    resize: none;
    white-space: pre;

    &.small {
      padding: 5px 10px;
    }
  }

  &__unit {
    margin: 0 5px;
    color: $color-text-weak;
    font-size: 11px;
  }
}
</style>
