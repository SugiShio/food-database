<template lang="pug">
textarea.input-textarea(:rows='rows', :value='value', @input='onInput')
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'InputTextarea',
  props: {
    rows: { type: Number, default: 5 },
    value: { type: String, default: '' },
  },
  methods: {
    onInput($event) {
      const value = $event.target.value
      this.$emit('input', value)
    },
  },
})
</script>

<style lang="scss" scoped>
.input-textarea {
  display: block;
  padding: 5px 10px;
  width: 100%;
  border: 1px solid $color-grey-weak;
  background-color: transparent;
  border-radius: 3px;
}
</style>
