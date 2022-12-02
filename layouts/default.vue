<template lang="pug">
.layouts-default
  .layouts-default__header
    button.layouts-default__button(v-if='isSignin', @click='signout') Signout
    button.layouts-default__button(v-else, @click='isSigninModalOpen = true') Signin
  .layouts-default__main
    Nuxt
  organisms-signin-modal(
    :is-signin-modal-open='isSigninModalOpen',
    @close-modal='isSigninModalOpen = false'
  )
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'LayoutsDefault',
  data() {
    return {
      isSigninModalOpen: false,
    }
  },
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
  min-height: 100vh;
  background: linear-gradient($color-grey, $color-main);

  &__header {
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
  }

  &__button {
    color: #fff;
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
