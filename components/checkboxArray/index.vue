<template lang="pug">
ul.checkbox-array(:class='{ inline }')
  li.checkbox-array__item(v-for='option in options')
    fd-checkbox(:value='option.value', :label='option.label', @input='onInput')
</template>

<script>
export default {
  name: 'CheckboxArray',
  props: {
    options: { type: Array, default: () => [] },
    inline: { type: Boolean, default: false },
    value: { type: Array, default: () => [] },
  },
  methods: {
    onInput({ value, checked }) {
      if (checked) {
        this.value.push(value)
      } else {
        const index = this.value.indexOf(value)
        if (index > -1) {
          this.value.splice(index, 1)
        }
      }
      this.$emit('input', this.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.checkbox-array {
  padding: 3px 0;
  &.inline {
    display: flex;

    .checkbox-array__item + .checkbox-array__item {
      margin-left: 10px;
    }
  }
}
</style>
