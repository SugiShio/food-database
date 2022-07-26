<template lang="pug">
.number-editor(:class='{ isEditing }')
  textarea.number-editor__editing(
    v-if='isEditing',
    type='number',
    :value='value',
    :id='idAttribute',
    rows=1,
    @input='onInput'
  )
  span.number-editor__not-editing(v-else) {{ displayValue }}
  span.number-editor__unit {{ unit }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NumberEditor',
  props: {
    idAttribute: { type: String, default: '', required: true },
    isEditing: { type: Boolean, default: false },
    unit: { type: String, default: '' },
    value: { type: [String, Number], default: 0 },
  },
  computed: {
    displayValue() {
      if (typeof this.value === 'number') {
        return this.value
      }
      if (this.value === '') {
        return this.value === '' ? '-' : this.value
      } else return '-'
    },
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
.number-editor {
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  background-color: transparent;
  border-radius: 3px;

  &.isEditing {
    border-color: $color-grey-weak;
  }

  &__editing {
    display: block;
    flex-grow: 1;
    padding: 5px 10px;
    border: none;
    resize: none;
  }

  &__not-editing {
    display: inline-block;
    padding: 5px 0;
  }

  &__unit {
    margin: 0 5px;
    color: #aec2b8;
    font-size: 11px;
  }
}
</style>
