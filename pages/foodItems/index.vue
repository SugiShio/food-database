<template lang="pug">
.p-foodItems-index
  section.p-foodItems-index__block
    h2.p-foodItems-index__title
      | 食材検索
    organisms-search

  section.p-foodItems-index__block
    h2.p-foodItems-index__title
      | 検索結果

    .p-foodItems-index__searching(v-if='isSearching') 検索中
    .p-foodItems-index__error(v-else-if='hasError') エラーがありました
    .p-foodItems-index__error(v-else-if='!foodItems.length') 条件に合う食材がありませんでした
    template(v-else)
      ul.p-foodItems-index__list
        li(v-for='foodItem in foodItems')
          nuxt-link(
            :to='{ name: "foodItems-id", params: { id: foodItem.id } }'
          )
            | {{ foodItem.nameWithProvider }}
      .p-foodItems-index__more(@click='showMore')
        | 次の{{ limit }}件を表示

  nuxt-link.p-foodItems-index__link-add(
    :to='{ name: "foodItems-id", params: { id: "new" } }'
  ) +
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'PagesFoodItemsIndex',
  computed: {
    foodItems() {
      return this.$store.state.search.foodItems
    },
    hasError() {
      return this.$store.state.search.hasError
    },
    isSearching() {
      return this.$store.state.search.isSearching
    },
    limit() {
      return this.$store.state.search.limit
    },
  },
  methods: {
    async showMore() {
      this.$store.dispatch('search/search')
    },
  },
})
</script>

<style lang="scss" scoped>
.p-foodItems-index {
  padding: 30px 20px 50px;

  &__block {
    margin: 30px 0;
  }

  &__title {
    font-weight: bold;
    margin: 10px 0;
  }

  &__search-item {
    margin: 10px 0;
  }

  &__label {
    font-size: 12px;
    margin-bottom: 3px;
  }

  &__link-add {
    position: fixed;
  }

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
