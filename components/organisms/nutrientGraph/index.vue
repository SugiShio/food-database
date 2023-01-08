<template lang="pug">
ul.o-nutrient-graph
  organisms-nutrient-graph-item(
    v-for='item in nutrientItems',
    :nutrient-id='item.nutrientId',
    :labels='item.labels',
    :base='item.base',
    :values='item.values',
    :key='item.nutrientId'
  )
</template>

<script>
import Vue from 'vue'
import { NUTRIENTS } from '~/constants/nutrients'
import { NUTRIENT_BASIS } from '~/models/nutrientBasis/constants'

export default Vue.extend({
  name: 'OrganismsNutrientGraph',
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
    nutrientBasis: {
      type: Array,
      default: () =>
        Object.keys(NUTRIENTS).map((key) => {
          const dietaryReferenceIntake = Object.values(NUTRIENT_BASIS).find(
            (value) => key === value.nutrientId
          )
          return {
            nutrientId: key,
            dietaryReferenceIntake,
          }
        }),
    },
  },
  computed: {
    nutrientItems() {
      return Object.keys(this.nutrients).map((key) => {
        const nutrientBasis = this.nutrientBasis.find((nb) => {
          return nb.nutrientId === key
        })
        const base = nutrientBasis ? nutrientBasis.dietaryReferenceIntake : 100
        return {
          nutrientId: key,
          values: this.nutrients[key],
          base,
        }
      })
    },
  },
})
</script>
