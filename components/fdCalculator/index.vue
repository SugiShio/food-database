<template lang="pug">
.fd-calculator(@click.stop='closeCalculator', @dblclick.prevent)
  .fd-calculator__container(@click.stop)
    .fd-error(v-if='hasError') Invalid input
    .fd-calculator__formula(v-else)
      | {{ formula }}
    .fd-calculator__value
      | {{ localValue }}
    ul.fd-calculator__buttons
      li.fd-calculator__item
        button.fd-calculator__button(type='button', @click='inputValue("(")') (
      li.fd-calculator__item
        button.fd-calculator__button(type='button', @click='inputValue(")")') )
      li.fd-calculator__item
        button.fd-calculator__button(type='button', @click='clearValue') C
      li.fd-calculator__item
        button.fd-calculator__button(type='button', @click='clearValueAll') AC
      li.fd-calculator__item(v-for='i in 3')
        button.fd-calculator__button(type='button', @click='inputValue(i + 6)') {{ i + 6 }}
      li.fd-calculator__item
        button.fd-calculator__button(type='button', @click='inputValue("/")') /
      li.fd-calculator__item(v-for='i in 3')
        button.fd-calculator__button(type='button', @click='inputValue(i + 3)') {{ i + 3 }}
      li.fd-calculator__item
        button.fd-calculator__button(type='button', @click='inputValue("*")') *
      li.fd-calculator__item(v-for='i in 3')
        button.fd-calculator__button(type='button', @click='inputValue(i)') {{ i }}
      li.fd-calculator__item
        button.fd-calculator__button(type='button', @click='inputValue("-")') -
      li.fd-calculator__item
        button.fd-calculator__button(type='button', @click='inputValue(0)') {{ 0 }}
      li.fd-calculator__item
        button.fd-calculator__button(type='button', @click='inputValue(".")') .
      li.fd-calculator__item
        button.fd-calculator__button(type='button', @click='calculate()') =
      li.fd-calculator__item
        button.fd-calculator__button(type='button', @click='inputValue("+")') +
    fd-button.fd-calculator__enter(
      label='Enter',
      type='button',
      @button-clicked='emitValue',
      :disabled='!isValueNumber'
    )
</template>

<script>
import { evaluate } from 'mathjs'
export default {
  name: 'FdCalculator',
  props: {
    value: { type: Number, default: 0 },
  },
  data() {
    return {
      formula: '',
      hasError: false,
      localValue: this.value || 0,
    }
  },
  computed: {
    isValueNumber() {
      return !isNaN(this.localValue)
    },
  },
  methods: {
    calculate() {
      try {
        const result = evaluate(this.localValue.toString())
        this.formula = `${this.localValue} =`
        this.localValue = Math.round(result * 100000) / 100000
      } catch (error) {
        this.hasError = true
        this.formula = ''
        console.error(error)
      }
    },
    clearValueAll() {
      this.hasError = false
      this.localValue = 0
      this.formula = ''
    },
    clearValue() {
      this.hasError = false
      this.localValue =
        this.localValue.toString().length === 1
          ? 0
          : this.localValue.toString().slice(0, -1)
    },
    closeCalculator() {
      this.$emit('close-calculator')
      this.clearValueAll()
    },
    emitValue() {
      this.$emit('value-entered', this.localValue)
    },
    inputValue(value) {
      this.hasError = false
      if (
        (this.localValue === 0 || this.localValue === '0') &&
        (!isNaN(value) || value === '(')
      ) {
        this.localValue = value
      } else {
        this.localValue += value.toString()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.fd-calculator {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  &__container {
    padding: 20px;
    border-radius: 3px;
    background-color: #fff;
    width: 100%;
    max-width: 300px;
    box-shadow: 0 0 10px rgba(#000, 0.08);
  }

  &__formula {
    min-height: 1.6em;
  }

  &__value {
    font-size: 24px;
  }

  &__buttons {
    display: flex;
    flex-wrap: wrap;
    margin: 19px -1px;
  }

  &__item {
    width: 25%;
    padding: 1px;
    user-select: none;
  }

  &__button {
    padding: 10px;
    width: 100%;
    border: 1px solid $color-grey-weak;
    background-color: transparent;
    border-radius: 3px;
    text-align: center;
  }

  &__enter {
    width: 100%;
  }
}
</style>
