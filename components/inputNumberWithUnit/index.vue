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

<script lang="ts">
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
    onAmountInput($event: Event) {
      const value = ($event.target as HTMLInputElement).value
      this.$emit('input', {
        amount: value,
        unit: this.unit,
      })
    },
    onUnitChange($event: Event) {
      const value = ($event.target as HTMLInputElement).value
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
  width: 100%;
  display: flex;
  border: 1px solid $color-grey-weak;
  background-color: transparent;
  border-radius: 3px;

  &__amount {
    padding: 5px 10px;
    border: none;
    flex-grow: 1;
  }

  &__unit {
    padding: 5px 10px;
    width: 60px;
    border: none;
    background-color: $color-grey-weak;
    line-height: inherit;
    appearance: none;
  }
}
</style>
