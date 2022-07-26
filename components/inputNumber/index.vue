<template lang="pug">
.input-number
  textarea.input-number__input(
    type='number',
    :value='value',
    :rows=1,
    @input='onInput'
  )
  span.input-number__unit {{ unit }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'InputText',
  props: {
    unit: { type: String, default: '' },
    value: { type: [String, Number], default: 0 },
  },
  methods: {
    onInput($event: Event) {
      const value = ($event.target as HTMLInputElement).value
      this.$emit('input', value)
    },
  },
})
</script>

<style lang="scss" scoped>
.input-number {
  display: flex;
  align-items: center;
  border: 1px solid $color-grey-weak;
  background-color: transparent;
  border-radius: 3px;

  &__input {
    display: block;
    flex-grow: 1;
    padding: 5px 10px;
    border: none;
    resize: none;
  }

  &__unit {
    margin: 0 5px;
    color: #aec2b8;
    font-size: 11px;
  }
}
</style>
