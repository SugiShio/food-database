<template lang="pug">
h1.fd-title {{ text }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'FdTitle',
  props: {
    text: { type: String, default: '' },
  },
})
</script>

<style lang="scss" scoped>
.fd-title {
  font-size: $font-size-large;
}
</style>
