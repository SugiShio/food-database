<template lang="pug">
.o-input-nutrients-item
  textarea.o-input-nutrients-item__input(
    :value='value',
    :rows=1,
    @focus='onFocus',
    @input='onInput',
    @keydown.enter.prevent
  )
  span.o-input-nutrients-item__unit {{ unit }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'OrganismsInputNutrientsItem',
  props: {
    unit: { type: String, default: '' },
    value: { type: [String, Number], default: 0 },
  },
  methods: {
    onFocus($event) {
      $event.target.select()
    },
    onInput($event) {
      const value = $event.target.value
      this.$emit('input', value)
    },
  },
})
</script>

<style lang="scss" scoped>
.o-input-nutrients-item {
  display: flex;
  align-items: center;
  width: 100%;
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
    color: $color-text-weak;
    font-size: 11px;
  }
}
</style>
