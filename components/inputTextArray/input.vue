<template lang="pug">
span.input-text-array-input
  input.input-text-array-input__input(
    v-if='isEditing',
    :value='value',
    @blur='endEditing',
    ref='input'
  )
  span.input-text-array-input__span(v-else, @click='startEditing')
    | {{ value }}
    img.input-text-array-input__remove(
      src='/images/cross.svg',
      @click='onRemoveClicked'
    )
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'InputTextArrayInput',
  data() {
    return {
      isEditing: false,
    }
  },
  props: {
    value: { type: String, default: '' },
  },
  methods: {
    endEditing($event: Event) {
      const value = ($event.target as HTMLInputElement).value
      this.$emit('end-editing', value)
      this.isEditing = false
    },
    onRemoveClicked() {
      this.$emit('remove-clicked')
    },
    startEditing() {
      this.isEditing = true
      this.$nextTick(() => {
        ;(this.$refs.input as HTMLInputElement).focus()
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.input-text-array-input {
  align-self: center;

  & + & {
    margin-left: 3px;
  }

  &__span,
  &__input {
    border-radius: 3px;
    padding: 3px 5px;
    border: none;
  }

  &__span {
    position: relative;
    display: inherit;
    padding-right: 25px;
    background-color: $color-main;
    color: #fff;
    word-break: keep-all;
  }

  &__input {
    border: 1px solid $color-text-weak;
  }

  &__remove {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 5px;
    margin: auto;
    width: 13px;
    height: 13px;
    transition: opacity 0.3s;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
