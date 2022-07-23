<template lang="pug">
div
  label {{ label }}
  input(
    type='number',
    :value='value',
    @input='onInput',
    :disabled='disabled',
    :step='step'
  )
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'NumberEditor',
  props: {
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    step: { type: String, default: '0.1' },
    value: { type: Number, default: 0 },
  },
  methods: {
    onInput($event: Event) {
      const value = Number(($event.target as HTMLInputElement).value)
      this.$emit('input', value)
    },
  },
})
</script>
