<template lang="pug">
span.input-number-with-unit
  input.input-number-with-unit__amount(
    type='number',
    :value='amount',
    @input='onAmountInput'
  )
  select.input-number-with-unit__unit(:value='unit', @change='onUnitChange')
    option(v-for='u in units')
      | {{ u.unit }}
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'InputNumberWithUnit',
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          amount: 0,
          unit: 'g',
        }
      },
    },
    amount: { type: [Number, String], required: true, default: 0 },
    unit: { type: String, default: 'g' },
    units: { type: Array, default: () => [] },
  },
  methods: {
    onAmountInput($event) {
      const value = $event.target.value
      this.$emit('input', {
        amount: value,
        unit: this.unit,
      })
    },
    onUnitChange($event) {
      const value = $event.target.value
      this.$emit('input', {
        amount: this.amount,
        unit: value,
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.input-number-with-unit {
  position: relative;
  width: 100%;
  display: flex;
  border: 1px solid $color-grey-weak;
  background-color: transparent;
  border-radius: 3px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 8px;
    margin: auto;
    width: 5px;
    height: 5px;
    border-right: 1px solid $color-grey-weak;
    border-bottom: 1px solid $color-grey-weak;
    transform: rotate(45deg);
  }

  &__amount {
    padding: 5px 10px;
    border: none;
    flex-grow: 1;
    width: 100%;
  }

  &__unit {
    padding: 5px 20px 5px 0;
    width: 60px;
    border: none;
    color: $color-grey-weak;
    text-align: right;
    line-height: inherit;
    appearance: none;
  }
}
</style>
