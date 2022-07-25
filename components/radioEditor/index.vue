<template lang="pug">
.radio-editor
  ul.radio-editor__editing(v-if='isEditing')
    li.radio-editor__option(v-for='option in options')
      label.radio-editor__option-label(
        :class='{ isChecked: isChecked(option) }'
      )
        input(
          type='radio',
          :value='option.value',
          :name='nameAttribute',
          @input='onInput'
        )
        | {{ option.label }}
  .radio-editor__not-editing(v-else) {{ displayValue }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'RadioEditor',
  props: {
    options: { type: Array, default: () => [] },
    isEditing: { type: Boolean, default: false },
    nameAttribute: { type: String, default: '' },
    value: { type: String, default: '' },
  },
  computed: {
    displayValue() {
      const option = this.options.find((option) => {
        return this.value === option.value
      })

      return option ? option.label : ''
    },
  },
  methods: {
    onInput($event: Event) {
      const value = ($event.target as HTMLInputElement).value
      this.$emit('input', value)
    },
    isChecked(option) {
      return this.value === option.value
    },
  },
})
</script>

<style lang="scss" scoped>
.radio-editor {
  &__editing {
    display: inline-flex;
    border: 1px solid $color-grey-weak;
    border-radius: 3px;
  }

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

  &__not-editing {
    display: inline-block;
    padding: 5px 0;
  }
}
</style>
