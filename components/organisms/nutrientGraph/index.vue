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

<script lang="ts">
import Vue from 'vue'
import { NUTRIENTS } from '@/models/nutrient/constants'
import { NUTRIENT_BASIS, NutrientBasis } from '~/models/nutrientBasis/constants'

export default Vue.extend({
  name: 'OrganismsNutrientGraph',
  props: {
    nutrients: {
      type: Object,
      default: () => {
        const result: { [key: string]: number[] } = {}
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
          return (nb as NutrientBasis).nutrientId === key
        })
        const base = nutrientBasis
          ? (nutrientBasis as NutrientBasis).dietaryReferenceIntake
          : 100
        return {
          nutrientId: key,
          values: (this.nutrients as { [key: string]: number[] })[key],
          base,
        }
      })
    },
  },
})
</script>
