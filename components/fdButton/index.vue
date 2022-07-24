<template lang="pug">
button.fd-button(:type='type', @click='$emit("button-clicked")') {{ label }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'FdButton',
  props: {
    label: { type: String, default: '' },
    type: { type: String, default: 'button' },
  },
  methods: {},
})
</script>

<style lang="scss" scoped>
.fd-button {
  border-radius: 3px;
  border: 1px solid $color-main;
  background-color: $color-main;
  padding: 5px 10px;
  color: #fff;
}
</style>
