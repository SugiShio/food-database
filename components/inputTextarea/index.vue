<template lang="pug">
textarea.input-textarea(:rows='rows', :value='value', @input='onInput')
</template>

<script>
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
@import '~/assets/stylesheets/input';

.input-textarea {
  @extend %input;
}
</style>
