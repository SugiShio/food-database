<template lang="pug">
div
  div(v-if='isSignin')
    p hello, {{ displayName }}
    nav
      ul
        li
          nuxt-link.foodItems-id__link(:to={ name: "foodItems" }) 食品データベース
        li
          nuxt-link.foodItems-id__link(:to={ name: "recipes" }) レシピ
        li
          nuxt-link.foodItems-id__link(:to={ name: "daily" }) デイリー
    fd-button(label='Signout', type='button', @button-clicked='signout')

  div(v-else)
    input(v-model='email')
    input(v-model='password', type='password')
    button(type='button', @click='signin') singing
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PagesIndex',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    displayName() {
      return this.$store.getters.displayName
    },
    isSignin() {
      return this.$store.state.isSignin
    },
  },
  methods: {
    signin() {
      if (!this.email || !this.password) return
      const auth = this.$fire.auth
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          if (!data.user) return

          this.$store.commit('setUser', {
            uid: data.user.uid,
            displayName: data.user.uid,
          })
          this.$store.commit('setIsSignin')
        })
        .catch((_) => {})
    },
    signout() {
      this.$fire.auth.signOut()
    },
  },
})
</script>
