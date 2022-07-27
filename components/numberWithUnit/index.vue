<template lang="pug">
.number-with-unit
  span.number-with-unit__number {{ displayValue }}
  span.number-with-unit__unit {{ unit }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NumberWithUnit',
  props: {
    unit: { type: String, default: '' },
    number: { type: [String, Number], default: 0 },
  },
  computed: {
    displayValue() {
      if (typeof this.number === 'number') {
        return this.number
      }
      if (this.number === '') {
        return this.number === '' ? '-' : this.number
      } else return '-'
    },
  },
})
</script>

<style lang="scss" scoped>
.number-with-unit {
  display: inline-flex;
  align-items: center;
  border-radius: 3px;

  &__unit {
    margin: 0 5px;
    color: $color-text-weak;
    font-size: 11px;
  }
}
</style>
