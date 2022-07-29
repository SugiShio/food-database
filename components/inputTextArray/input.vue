<template lang="pug">
component.input-text-array-input(
  :class='htmlTag',
  :is='htmlTag',
  :value='value',
  v-text='value',
  @blur='endEditing',
  @click='toggleEditing'
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
  computed: {
    htmlTag() {
      return this.isEditing ? 'input' : 'span'
    },
  },
  methods: {
    onInput($event: Event) {
      const value = ($event.target as HTMLInputElement).value
      this.$emit('input', value)
    },
    endEditing() {
      this.isEditing = false
      this.$emit('end-editing', this.$el.value)
    },
    startEditing() {
      this.isEditing = true
      this.$emit('start-editing')
      this.$nextTick(() => {
        this.$el.focus()
      })
    },
    toggleEditing() {
      this.isEditing ? this.endEditing() : this.startEditing()
    },
  },
})
</script>

<style lang="scss" scoped>
.input-text-array-input {
  align-self: center;
  border-radius: 3px;
  padding: 3px 5px;
  border: none;

  &.span {
    padding-right: 30px;
    background-color: $color-main;
    color: #fff;
    word-break: keep-all;
  }

  &.input {
    border: 1px solid $color-text-weak;
  }
}
</style>
