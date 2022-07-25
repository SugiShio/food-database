<template lang="pug">
.textarea-editor(:class='{ isEditing }')
  textarea.textarea-editor__editing(
    v-if='isEditing',
    type='text',
    :id='idAttribute',
    :rows='rows',
    :value='value',
    @input='onInput'
  )
  span.textarea-editor__not-editing(v-else) {{ value }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TextareaEditor',
  props: {
    idAttribute: { type: String, default: '', required: true },
    isEditing: { type: Boolean, default: false },
    rows: { type: Number, default: 5 },
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
.textarea-editor {
  width: 100%;
  border: 1px solid transparent;
  background-color: transparent;
  border-radius: 3px;

  &.isEditing {
    border-color: $color-grey-weak;
  }

  &__editing {
    display: block;
    padding: 5px 10px;
    width: 100%;
    border: none;
  }

  &__not-editing {
    display: inline-block;
    padding: 5px 0;
  }
}
</style>
