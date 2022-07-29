<template lang="pug">
.input-text-array
  input-text-array-input(v-for='(v, index) in value', :value='v', :key='index')
  input.input-text-array__input(v-model='localValue', @change='onChange')
</template>

<script lang="ts">
import Vue from 'vue'
import InputTextArrayInput from './input.vue'

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
    onChange($event: Event) {
      const value = ($event.target as HTMLInputElement).value

      this.$emit('text-array-input', value)
      this.localValue = ''
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
    flex-grow: 1;
    border: none;
  }

  span,
  input {
    margin: 0 1px;
  }
}
</style>
