<template lang="pug">
ul.input-radio
  li.input-radio__option(v-for='option in options')
    label.input-radio__option-label(:class='{ isChecked: isChecked(option) }')
      input(type='radio', :value='option.value', @click='onInput')
      | {{ option.label }}
</template>

<script lang="ts">
import Vue from 'vue'
import { RadioOption } from '@/models/radioOption'

export default Vue.extend({
  name: 'InputRadio',
  props: {
    options: { type: Array, default: () => [] },
    isEditing: { type: Boolean, default: false },
    nameAttribute: { type: String, default: '' },
    value: { type: String, default: '' },
  },
  computed: {
    displayValue() {
      const option = this.options.find((option) => {
        return this.value === (option as RadioOption).value
      })

      return option ? (option as RadioOption).label : ''
    },
  },
  methods: {
    onInput($event: Event) {
      const value = ($event.target as HTMLInputElement).value
      this.$emit('input', value)
    },
    isChecked(option: RadioOption) {
      return this.value === option.value
    },
  },
})
</script>

<style lang="scss" scoped>
.input-radio {
  display: inline-flex;
  border: 1px solid $color-grey-weak;
  border-radius: 3px;

  &__option {
    & + & {
      border-left: 1px solid $color-grey-weak;
    }
  }

  &__option-label {
    display: inline-block;
    padding: 5px 10px;
    cursor: pointer;
    transition: color 0.3s, background-color 0.3s;

    &:hover {
      color: $color-main;
    }

    &.isChecked {
      background-color: $color-main;
      color: #fff;
      cursor: default;
    }
  }
}
</style>
