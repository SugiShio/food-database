<template lang="pug">
.input-number
  textarea.input-number__input(
    type='number',
    :value='value',
    :rows=1,
    @focus='onFocus',
    @change='$emit("change", $event.target.value)',
    @input='$emit("input", $event.target.value)',
    @keydown.enter.prevent
  )
  span.input-number__unit {{ unit }}
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'InputNumber',
  props: {
    unit: { type: String, default: '' },
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
.input-number {
  display: inline-flex;
  align-items: center;
  border: 1px solid $color-grey-weak;
  background-color: transparent;
  border-radius: 3px;

  &__input {
    display: block;
    flex-grow: 1;
    padding: 5px 10px;
    width: 100%;
    border: none;
    resize: none;
    white-space: pre;
  }

  &__unit {
    margin: 0 5px;
    color: $color-text-weak;
    font-size: 11px;
  }
}
</style>
