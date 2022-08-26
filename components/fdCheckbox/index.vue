<template lang="pug">
label.fd-checkbox(:class='{ isChecked }')
  input(type='checkbox', :value='value', @input='emitValue')
  | {{ label }}
</template>

<script>
export default {
  name: 'FdCheckbox',
  props: {
    label: { type: String, default: '' },
    value: { type: String, default: '' },
  },
  data() {
    return {
      isChecked: false,
    }
  },
  methods: {
    emitValue($event) {
      this.isChecked = $event.target.checked
      this.$emit('input', { value: this.value, checked: this.isChecked })
    },
  },
}
</script>

<style lang="scss" scoped>
.fd-checkbox {
  display: flex;
  align-items: center;

  &::before {
    display: inline-block;
    margin-right: 5px;
    content: '';
    width: 12px;
    height: 12px;
    border: 1px solid $color-grey-weak;
    border-radius: 3px;
  }

  &.isChecked::before {
    background-color: $color-main;
  }
}
</style>
