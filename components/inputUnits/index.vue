<template lang="pug">
.input-units
  .input-units__item(v-for='(v, index) in localValue', :key='v.unit')
    input-text(:value='v.unit', @input='onUnitInput($event, index)')
    | 1 {{ v.unit }} あたり
    input-number(type='number', :value='v.rate')
    | g
  button(type='button', @click='$emit("add-unit-clicked")') add unit
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'InputUnits',
  props: {
    value: { type: Array, default: () => [] },
  },
  computed: {
    localValue() {
      return this.value.slice(1)
    },
  },
  methods: {
    onUnitInput(unit: string, index: number) {
      this.localValue[index].unit = unit
      const value = [this.value[0], ...this.localValue]
      console.log(value)
      this.$emit('units-input', value)
    },
  },
})
</script>

<style lang="scss" scoped>
.input-units {
  &__item {
    display: flex;
  }
}
</style>
