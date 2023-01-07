<template lang="pug">
.input-text-array
  input-text-array-input(
    v-for='(v, index) in value',
    :value='v',
    :key='v',
    @end-editing='onEndEditing($event, index)',
    @remove-clicked='onRemoveClicked(index)'
  )
  input.input-text-array__input(
    v-model='localValue',
    @input='onInput',
    @change='onChange',
    @keydown.delete='onKeydownDelete',
    @keydown.tab.prevent='onKeydownTab'
  )
</template>

<script lang="ts">
import Vue from 'vue'
import InputTextArrayInput from './input.vue'

const REGEX_SEPERATOR = /[　,]/

export default Vue.extend({
  name: 'InputTextArray',
  components: { InputTextArrayInput },
  props: {
    value: { type: Array, default: () => [] },
  },
  data() {
    return {
      localValue: '',
    }
  },
  methods: {
    onChange() {
      const values = this.localValue.split(REGEX_SEPERATOR)
      values.forEach((value) => {
        this.$emit('text-array-input', { value })
      })

      this.localValue = ''
    },
    onEndEditing(value, index) {
      this.$emit('text-array-input', { value, index })
    },
    onInput() {
      const lastCaractor = this.localValue
      if (REGEX_SEPERATOR.test(lastCaractor)) {
        const value = this.localValue.replace(REGEX_SEPERATOR, '')
        this.$emit('text-array-input', { value })
        this.localValue = ''
      }
    },
    onKeydownDelete($event) {
      if (this.localValue.length || $event.isComposing) return
      this.$emit('text-array-input', { index: this.value.length - 1 })
    },
    onKeydownTab() {
      this.$emit('text-array-input', { value: this.localValue })
      this.localValue = ''
    },
    onRemoveClicked(index) {
      this.$emit('text-array-input', { value: '', index })
    },
  },
})
</script>

<style lang="scss" scoped>
.input-text-array {
  display: flex;
  height: 33px;
  padding: 0 3px;
  border-radius: 3px;
  border: 1px solid $color-grey-weak;
  background-color: transparent;
  overflow: scroll;

  &__input {
    padding: 0 3px;
    flex-grow: 1;
    border: none;
  }
}
</style>
