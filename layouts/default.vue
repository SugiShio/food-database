<template lang="pug">
.layouts-default
  .layouts-default__header(v-if='isSignin')
    button.layouts-default__button-signout(@click='signout') Signout
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
  methods: {
    signout() {
      this.$fire.auth.signOut()
    },
  },
})
</script>

<style lang="scss" scoped>
.layouts-default {
  &__header {
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
  }

  &__button-signout {
    color: $color-main;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.6;
    }
  }

  &__main {
    width: 800px;
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
