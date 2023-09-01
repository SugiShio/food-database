<template lang="pug">
select.fd-selector(
  :value='value',
  :disabled='isDisabled',
  @change='$emit("input", $event.target.value)'
)
  option.fd-selector__option(
    v-for='option in options',
    :value='option.value',
    :disabled='option.disabled'
  )
    | {{ option.value }}
</template>

<script>
export default {
  name: 'FdSelector',
  props: {
    options: { type: Array, default: () => [{ value: '---', disabled: true }] },
    value: { type: String, default: '' },
  },
  computed: {
    isDisabled() {
      return this.options.length <= 1
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/stylesheets/input';
.fd-selector {
  @extend %input;
  height: 41px;

  &[disabled] {
    background-color: $color-grey;
  }
}
</style>
