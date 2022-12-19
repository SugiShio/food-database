<template lang="pug">
div
  organisms-daily(v-if='uid', :id='id', :uid='uid')

  nav
    ul
      li
        nuxt-link.foodItems-id__link(:to='{ name: "foodItems" }') 食品データベース
      li
        nuxt-link.foodItems-id__link(:to='{ name: "recipes" }') レシピ
      li
        nuxt-link.foodItems-id__link(:to='{ name: "daily" }') デイリー
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PagesIndex',
  data() {
    const today = new Date()
    const y = today.getFullYear()
    const m = today.getMonth() + 1
    const d = today.getDate()
    const id = `${y * 10000 + m * 100 + d}`

    return {
      id,
    }
  },
  computed: {
    uid() {
      return this.$store.state.user.uid
    },
  },
})
</script>
