<template lang="pug">
.text-editor(:class='{ isEditing }')
  input.text-editor__editing(
    v-if='isEditing',
    type='text',
    :id='idAttribute',
    :class='size',
    :value='value',
    @input='onInput'
  )
  component.text-editor__not-editing(:is='htmlTag', :class='size', v-else) {{ value }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    idAttribute: { type: String, default: '', required: true },
    isEditing: { type: Boolean, default: false },
    size: { type: String, default: '' },
    htmlTag: { type: String, default: 'span' },
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

    &.large {
      font-size: 24px;
    }
  }

  &__not-editing {
    padding: 5px 0;

    &.large {
      font-size: 24px;
    }
  }
}
</style>
