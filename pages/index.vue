<template lang="pug">
div
  organisms-daily(v-if='uid', :date='date', :uid='uid')

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
    const date = y * 10000 + m * 100 + d

    return {
      date,
    }
  },
  computed: {
    uid() {
      return this.$store.state.user.uid
    },
  },
})
</script>
