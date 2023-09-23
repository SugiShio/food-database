<template lang="pug">
.input-text
  input.input-text__input(
    type='text',
    :class='size',
    :disabled='disabled',
    :value='value',
    @input='onInput',
    @change='onChange',
    @keydown.enter='$emit("keydown-enter", $event)'
  )
  button(v-if='clearButton', @click='$emit("input", "")') x
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'InputText',
  props: {
    clearButton: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    size: { type: String, default: '' },
    value: { type: String, default: '' },
  },
  methods: {
    onChange($event) {
      const value = $event.target.value
      this.$emit('change', value)
    },
    onInput($event) {
      const value = $event.target.value
      this.$emit('input', value)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';

.input-text {
  @extend %input;
  display: flex;
  padding: 0;

  &.large {
    font-size: $font-size-large;
  }

  &__input {
    @extend %input;
    border: 0;
    flex-grow: 1;

    &[disabled] {
      color: $color-text-weak;
    }
  }
}
</style>
