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
      const v = [...this.value]
      if (checked) {
        v.push(value)
      } else {
        const index = v.indexOf(value)
        if (index > -1) {
          v.splice(index, 1)
        }
      }
      this.$emit('input', v)
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
