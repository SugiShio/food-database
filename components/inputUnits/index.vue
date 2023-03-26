<template lang="pug">
.input-units
  .input-units__item(v-for='(v, index) in localValue', :key='v.unit')
    label.input-units__unit
      span.input-units__label 単位
      input-text(:value='v.unit', @change='onUnitChange($event, index)')
    label.input-units__rate
      span.input-units__label 1 {{ v.unit || '単位' }} あたり
      input-number(
        unit='g',
        :value='v.rate',
        @input='onRateInput($event, index)'
      )
  button.input-units__add-button(
    type='button',
    :disabled='isLastItemEmpty',
    @click='onAddUnitClicked'
  )
    i.icon-plus-circle.input-units__add-icon
    | add unit
</template>

<script>
import Vue from 'vue'
import { DEFAULT_UNIT } from '~/models/unit'
export default Vue.extend({
  name: 'InputUnits',
  props: {
    value: { type: Array, default: () => [DEFAULT_UNIT] },
  },
  computed: {
    isLastItemEmpty() {
      if (!this.localValue.length) return false
      return !this.localValue[this.localValue.length - 1].unit
    },
    localValue() {
      return this.value.slice(1)
    },
  },
  methods: {
    onAddUnitClicked() {
      if (this.isLastItemEmpty) return
      this.$emit('add-unit-clicked')
    },
    onUnitChange(unit, index) {
      this.localValue[index].unit = unit
      const value = [this.value[0], ...this.localValue]
      this.$emit('units-input', value)
    },
    onRateInput(rate, index) {
      this.localValue[index].rate = rate
      const value = [this.value[0], ...this.localValue]
      this.$emit('units-input', value)
    },
  },
})
</script>

<style lang="scss" scoped>
.input-units {
  width: 100%;

  &__item {
    display: flex;
    margin-bottom: 10px;
  }

  &__unit,
  &__rate {
    width: calc(50% - 5px);
  }

  &__rate {
    margin-left: 10px;
  }

  &__label {
    font-size: 10px;
    margin-bottom: 5px;
  }

  &__add-button {
    font-size: inherit;
    color: $color-text-weak;
    transition: 0.3s;

    &:not([disabled]):hover {
      opacity: 0.7;
    }

    &[disabled] {
      cursor: default;
      opacity: 0.5;
    }
  }

  &__add-icon {
    font-size: 1.3em;
    margin-right: 5px;
  }
}
</style>
