<template lang="pug">
.o-input-nutrients
  ul.o-input-nutrients__block
    li.o-input-nutrients__item(v-for='(nutrient, index) in value')
      label.o-input-nutrients__label
        | {{ nutrients[nutrient.nutrientId].label }}
      organisms-input-nutrients-item(
        :unit='nutrients[nutrient.nutrientId].unit',
        v-model='nutrient.value',
        @input='onInput($event, index)'
      )
</template>

<script lang="ts">
import Vue from 'vue'
import { NUTRIENTS } from '@/models/nutrient/constants'
import { Nutrient } from '~/models/nutrient'

export default Vue.extend({
  name: 'OrganismsInputNutrientsIndex',
  props: {
    value: {
      type: Array,
      default: () => {
        return Object.keys(NUTRIENTS).map((key) => {
          return {
            nutrientId: key,
            value: 0,
          }
        })
      },
    },
  },
  computed: {
    nutrients() {
      return NUTRIENTS
    },
  },
  methods: {
    onFocus($event: Event) {
      ;($event.target as HTMLInputElement).select()
    },
    onInput(value: string, index: number) {
      const SEPARATORS = /\n|\t|,/
      const values = value.split(SEPARATORS).map((v) => {
        const number = Number(v)
        return isNaN(number) ? null : number
      })
      const changedNutrients = values.map((value, i) => {
        const nutrientId = Object.keys(NUTRIENTS)[index + i]
        return new Nutrient(nutrientId, value)
      })
      // memo ↓よくない
      this.value.splice(index, values.length, ...changedNutrients)
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
