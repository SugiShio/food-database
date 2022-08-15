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
        this.$store.commit('setUser', {
          uid: user.uid,
          displayName: user.displayName,
        })
        this.$store.commit('setIsSignin')
      } else {
        this.$store.commit('resetUser')
      }
    })
  },
  methods: {
    async signout() {
      try {
        await this.$fire.auth.signOut()
        this.$store.commit('resetUser')
      } catch (_) {}
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
