<template lang="pug">
main.p-index
  organisms-search
  section.foodItems-index__block
    h2.foodItems-index__title
      | 検索結果

    .foodItems-index__searching(v-if='isSearching') 検索中
    .foodItems-index__error(v-else-if='hasError') エラーがありました
    .foodItems-index__error(v-else-if='!foodItems.length') 条件に合う食材がありませんでした
    template(v-else)
      ul.foodItems-index__list
        li(v-for='foodItem in foodItems')
          nuxt-link(
            :to='{ name: "foodItems-id", params: { id: foodItem.id } }'
          )
            | {{ foodItem.nameWithProvider }}

  nav
    ul
      li
        nuxt-link.foodItems-id__link(:to='{ name: "foodItems" }') 食品データベース
      li
        nuxt-link.foodItems-id__link(:to='{ name: "recipes" }') レシピ
      li
        nuxt-link.foodItems-id__link(:to='{ name: "daily" }') デイリー

  nuxt-link.p-index__link-add(
    :to='{ name: "foodItems-id", params: { id: "new" } }'
  ) +
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
@import '~/assets/stylesheets/variables';

.p-index {
  padding: 30px 20px 50px;

  &__link-add {
    background-color: $color-main;
    border-radius: 20px;
    bottom: 10px;
    box-shadow: 0 0 5px rgba(darken($color-main, 40%), 0.5);
    color: #fff;
    font-size: 25px;
    left: 10px;
    line-height: 40px;
    position: fixed;
    text-align: center;
    text-decoration: none;
    width: 40px;
  }
}
</style>
