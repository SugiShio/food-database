<template lang="pug">
.layouts-default
  .layouts-default__header
    | {{ isSignin }}
  .layouts-default__main
    Nuxt
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'LayoutsDefault',
  computed: {
    isSignin() {
      return this.$store.state.isSignin
    },
  },
  async created() {
    const auth = this.$fire.auth
    await auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('🙇')
        this.$store.commit('setIsSignin')
      } else {
        console.log('👪')
      }
    })
  },
})
</script>

<style lang="scss" scoped>
.layouts-default {
  &__main {
    width: 800px;
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
