<template lang="pug">
main.p-index
  nav
    ul
      li
        nuxt-link.foodItems-id__link(:to='{ name: "foodItems" }') 食品データベース
      li
        nuxt-link.foodItems-id__link(:to='{ name: "recipes" }') レシピ
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'PagesIndex',
  computed: {
    foodItems() {
      return this.$store.state.search.foodItems
    },
    hasError() {
      return this.$store.state.search.hasError
    },

    id() {
      if (this.year && this.month && this.date)
        return `${this.year}${this.month}${this.date}`

      const today = new Date()
      const y = today.getFullYear()
      const m = today.getMonth() + 1
      const d = today.getDate()
      return `${y * 10000 + m * 100 + d}`
    },
    isSearching() {
      return this.$store.state.search.isSearching
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

<style lang="scss" scoped>
.p-index {
  padding: 30px 20px 50px;
}
</style>
