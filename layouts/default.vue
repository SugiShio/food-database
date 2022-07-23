<template lang="pug">
div
  | {{ isSignin }}
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
