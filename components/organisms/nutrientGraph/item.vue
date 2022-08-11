<template lang="pug">
li.nutrient-graph-item
  .nutrient-graph-item__label
    | {{ label }}

  .nutrient-graph-item__body
    .nutrient-graph-item__number
      number-with-unit(:decimal-digit='2', :number='sum', :unit='unit')
    .nutrient-graph-item__bar
      graph-bar(:base='base', :values='values')
</template>

<script lang="ts">
import Vue from 'vue'
import { NUTRIENTS } from '@/models/nutrient/constants'

export default Vue.extend({
  name: 'OrganismsNutrientGraphItem',
  props: {
    labels: { type: Array, default: () => [] },
    base: { type: Number, default: 100 },
    nutrientId: { type: String, required: true },
    values: { type: Array, default: () => [] },
  },
  computed: {
    label() {
      return NUTRIENTS[this.nutrientId].label
    },
    sum() {
      return this.values.reduce((sum: number, currentValue: number) => {
        return sum + currentValue
      }, 0)
    },
    unit() {
      return NUTRIENTS[this.nutrientId].unit
    },
  },
})
</script>

<style lang="scss" scoped>
.nutrient-graph-item {
  @extend .list__item;
  margin: 15px 0;

  &__label {
    @extend .list__item-label;
  }

  &__body {
    @extend .list__item-body;
  }

  &__number {
    width: 100px;
    flex-shrink: 0;
  }

  &__bar {
    flex-grow: 1;
  }
}
</style>
