<template lang="pug">
.layouts-default
  .layouts-default__header
    button(@click='isMenuOpen = true') Menu
    button.layouts-default__button(v-if='isSignin', @click='signout') Signout
    button.layouts-default__button(v-else, @click='isSigninModalOpen = true') Signin
  .layouts-default__main
    Nuxt
  organisms-signin-modal(
    :is-signin-modal-open='isSigninModalOpen',
    @close-modal='isSigninModalOpen = false'
  )

  .layouts-default__menu-bg(v-show='isMenuOpen', @click='isMenuOpen = false')
  nav.layouts-default__menu(:class='{ isMenuOpen }')
    ul
      li.layouts-default__menu-item(v-for='menu in navMenu')
        nuxt-link.layouts-default__menu-link(
          :to='{ name: menu.name }',
          :class='{ current: $route.name === menu.name }'
        ) {{ menu.label }}
      li.layouts-default__menu-item-close
        button(@click='isMenuOpen = false') close
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'LayoutsDefault',
  data() {
    return {
      isSigninModalOpen: false,
      isMenuOpen: false,
      navMenu: [
        { name: 'index', label: 'Top' },
        { name: 'foodItems', label: '食品データベース' },
        { name: 'recipes', label: 'レシピ' },
      ],
    }
  },
  computed: {
    isSignin() {
      return this.$store.state.isSignin
    },
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        this.isMenuOpen = false
      },
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

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
  }

  &__button {
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

  &__menu-bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background: rgba(#fff, 0.8);
  }

  &__menu {
    background-color: #fff;
    bottom: 0;
    box-shadow: 0 0 10px rgba(darken($color-main, 40%), 0.1);
    position: fixed;
    padding: 20px 0;
    top: 0;
    transform: translateX(-100%);
    width: 60vw;

    &.isMenuOpen {
      transition: transform 0.3s;
      transform: translateX(0);
    }
  }

  &__menu-link {
    display: block;
    padding: 10px;
    text-decoration: none;
    transition: 0.3s;

    &:hover {
      background-color: $color-main;
      color: #fff;
    }

    &.current {
      color: #fff;
      background-color: $color-main;
      text-decoration: none;
    }
  }

  &__menu-item-close {
    display: block;
    padding: 10px;
    margin-top: 20px;
  }
}
</style>
