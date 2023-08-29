<template lang="pug">
.o-input-nutrients
  .o-input-nutrients__function
    span.o-input-nutrients__gram-input
      input-number(
        v-model='gram',
        unit='g',
        @change='onGramChange',
        @enter='onGramChange'
      )
    span
      | あたり
    fd-checkbox(label='入力値を等倍', @input='onShouldRecalculateValueInput')
  .o-input-nutrients__function
    span 小数点以下
    span.o-input-nutrients__digit-input
      input-number(v-model='numberOfDigits')
    span 桁で
    span
      fd-button(
        label='四捨五入',
        :disabled='numberOfDigits < 0',
        @button-clicked='round'
      )

  ul.o-input-nutrients__block
    li.o-input-nutrients__item(v-for='(v, key) in localValue')
      label.o-input-nutrients__label
        | {{ localValue.getLabel(key) }}
      organisms-input-nutrients-item(
        :title='localValue.getLabel(key)',
        :unit='localValue.getUnit(key)',
        v-model='localValue[key]',
        @input='onNutrientsInput($event, key)'
      )
</template>

<script>
import Vue from 'vue'
import { NUTRIENTS } from '~/constants/nutrients'
import { Nutrients } from '~/models/nutrients'

export default Vue.extend({
  name: 'OrganismsInputNutrientsIndex',
  props: {
    overwrite: { type: Boolean, default: false },
    value: {
      type: Nutrients,
      default: () => {
        return new Nutrients()
      },
    },
  },
  data() {
    return {
      gram: 100,
      gramOld: 100,
      localValue: new Nutrients({ ...this.value }),
      numberOfDigits: 2,
      shouldRecalculateValue: false,
    }
  },
  watch: {
    value() {
      if (!this.overwrite) return
      this.localValue = new Nutrients({ ...this.value })
      this.$emit('overwrite-completed')
    },
  },
  methods: {
    emitValue() {
      const value = Nutrients.getNutrientValues(
        this.localValue,
        (v) => (v * 100) / this.gram
      )
      this.$emit('input', new Nutrients(value))
    },
    onFocus($event) {
      $event.target.select()
    },
    onGramChange(value) {
      const gramNew = Number(value)
      if (isNaN(gramNew)) return

      if (this.shouldRecalculateValue) {
        const rate = gramNew / this.gramOld

        Object.keys(this.localValue).forEach((key) => {
          if (this.localValue[key] !== null)
            this.localValue[key] = this.localValue[key] * rate
        })

        this.emitValue()
      }
      this.gramOld = gramNew
    },
    onNutrientsInput(value, key) {
      const SEPARATORS = /\n|\t|,/
      const values = value.split(SEPARATORS).map((v) => {
        const number = Number(v)
        return isNaN(number) ? null : number
      })

      const nutrientIds = Object.keys(NUTRIENTS)
      const startIndex = nutrientIds.indexOf(key)

      values.forEach((v, index) => {
        if (!nutrientIds[startIndex + index]) return
        this.localValue[nutrientIds[startIndex + index]] = v
      })
      this.emitValue()
    },
    onShouldRecalculateValueInput({ checked }) {
      this.shouldRecalculateValue = checked
    },
    round() {
      const rate = 10 ** this.numberOfDigits
      Object.keys(this.localValue).forEach((key) => {
        if (this.localValue[key] !== null)
          this.localValue[key] = Math.round(this.localValue[key] * rate) / rate
      })
      this.emitValue()
    },
  },
})
</script>

<style lang="scss" scoped>
.o-input-nutrients {
  &__function {
    margin: 10px 0;
  }

  span + span {
    margin-left: 5px;
  }

  &__digit-input {
    display: inline-block;
    width: 50px;
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
