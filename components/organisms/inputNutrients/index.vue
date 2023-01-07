<template lang="pug">
.o-input-nutrients
  ul.o-input-nutrients__block
    li.o-input-nutrients__item(v-for='(v, key) in value')
      label.o-input-nutrients__label
        | {{ value.getLabel(key) }}
      organisms-input-nutrients-item(
        :unit='value.getUnit(key)',
        v-model='value[key]',
        @input='onInput($event, key)'
      )
</template>

<script lang="ts">
import Vue from 'vue'
import { NUTRIENTS } from '~/constants/nutrients'
import { FoodItemNutrients } from '~/models/foodItem/nutrients'

export default Vue.extend({
  name: 'OrganismsInputNutrientsIndex',
  props: {
    value: {
      type: FoodItemNutrients,
      default: () => {
        return new FoodItemNutrients()
      },
    },
  },
  methods: {
    onFocus($event) {
      $event.target.select()
    },
    onInput(value, key) {
      const SEPARATORS = /\n|\t|,/
      const values = value.split(SEPARATORS).map((v) => {
        const number = Number(v)
        return isNaN(number) ? null : number
      })

      const nutrientIds = Object.keys(NUTRIENTS)
      const startIndex = nutrientIds.indexOf(key)

      values.forEach((v, index) => {
        if (!nutrientIds[startIndex + index]) return
        this.value[nutrientIds[startIndex + index]] = v
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.o-input-nutrients {
  &__title {
    margin: 10px 0;
    font-weight: bold;
  }

  &__block {
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    align-items: center;
    width: calc(50% - 10px);
    margin: 5px 0;

    @include screen-pc {
      display: flex;
    }

    &:nth-child(even) {
      margin-left: 20px;
    }
  }

  &__label {
    width: 120px;
    margin-right: 10px;

    @include screen-sp {
      display: inline-block;
      font-size: 12px;
      margin-bottom: 5px;
    }
  }
}
</style>
