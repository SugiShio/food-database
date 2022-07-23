<template lang="pug">
div
  p hello!
  input(v-model='email')
  input(v-model='password' type='password')
  button(type='button' @click='signin') singing

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
  methods: {
    signin() {
      if (!this.email || !this.password) return
      const auth = this.$fire.auth
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$store.commit('setIsSignin')
        })
        .catch((error) => {})
    },
  },
})
</script>
