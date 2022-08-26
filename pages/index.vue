<template lang="pug">
div
  nav
    ul
      li
        nuxt-link.foodItems-id__link(:to={ name: "foodItems" }) 食品データベース
      li
        nuxt-link.foodItems-id__link(:to={ name: "recipes" }) レシピ
      li
        nuxt-link.foodItems-id__link(:to={ name: "daily" }) デイリー
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
  },
})
</script>
