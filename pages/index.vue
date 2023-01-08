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

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'PagesIndex',
  computed: {
    id() {
      if (this.year && this.month && this.date)
        return `${this.year}${this.month}${this.date}`

      const today = new Date()
      const y = today.getFullYear()
      const m = today.getMonth() + 1
      const d = today.getDate()
      return `${y * 10000 + m * 100 + d}`
    },
    year() {
      return this.$route.query.year
    },
    month() {
      return this.$route.query.month
    },
    date() {
      return this.$route.query.date
    },
    uid() {
      return this.$store.state.user.uid
    },
  },
})
</script>
