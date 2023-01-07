<template lang="pug">
.o-nutrients-summary
  dl
    .o-nutrients-summary__row
      .o-nutrients-summary__main-item
        dt.o-nutrients-summary__label {{ nutrientLabels.calorie }}
        dd
          number-with-unit(
            :decimal-digit='1',
            :number='nutrients.calorie',
            :unit='nutrientUnits.calorie'
          )
    .o-nutrients-summary__row
      .o-nutrients-summary__main-item
        dt.o-nutrients-summary__label {{ nutrientLabels.protein }}
        dd
          number-with-unit(
            :decimal-digit='1',
            :number='nutrients.protein',
            :unit='nutrientUnits.protein'
          )

      .o-nutrients-summary__main-item
        dt.o-nutrients-summary__label {{ nutrientLabels.fat }}
        dd
          number-with-unit(
            :decimal-digit='1',
            :number='nutrients.fat',
            :unit='nutrientUnits.fat'
          )

      .o-nutrients-summary__main-item
        dt.o-nutrients-summary__label {{ nutrientLabels.carbohydrate }}
        dd
          number-with-unit(
            :decimal-digit='1',
            :number='nutrients.carbohydrate',
            :unit='nutrientUnits.carbohydrate'
          )
</template>

<script lang="ts">
import Vue from 'vue'
import { NUTRIENTS } from '~/constants/nutrients'

export default Vue.extend({
  name: 'OrganismsNutrientsSummary',
  props: {
    nutrients: {
      type: Object,
      default: () => {
        const result = {}
        Object.keys(NUTRIENTS).forEach((key) => {
          result[key] = []
        })
      },
    },
  },
  computed: {
    nutrientLabels() {
      const result = {}
      Object.keys(NUTRIENTS).forEach((key) => {
        result[key] = NUTRIENTS[key].label
      })
      return result
    },
    nutrientUnits() {
      const result = {}
      Object.keys(NUTRIENTS).forEach((key) => {
        result[key] = NUTRIENTS[key].unit
      })
      return result
    },
  },
})
</script>

<style lang="scss" scoped>
.o-nutrients-summary {
  &__main-item {
    text-align: center;
    width: 100%;
  }

  &__row {
    display: flex;
    margin: 20px 0;
  }

  &__label {
    font-size: 12px;
  }
}
</style>
