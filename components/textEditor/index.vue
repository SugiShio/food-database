<template lang="pug">
.text-editor(:class='{ isEditing }')
  input.text-editor__editing(
    v-if='isEditing',
    type='text',
    :id='idAttribute',
    :value='value',
    @input='onInput'
  )
  span.text-editor__not-editing(v-else) {{ value }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    idAttribute: { type: String, default: '', required: true },
    isEditing: { type: Boolean, default: false },
    value: { type: String, default: '' },
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
.text-editor {
  width: 100%;
  border: 1px solid transparent;
  background-color: transparent;
  border-radius: 3px;

  &.isEditing {
    border-color: #cfdbd5;
  }

  &__editing {
    display: block;
    padding: 5px 10px;
    width: 100%;
    border: none;
  }

  &__not-editing {
    padding: 5px 0;
  }
}
</style>
