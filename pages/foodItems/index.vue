<template lang="pug">
.foodItems-index
  section.foodItems-index__block
    h2.foodItems-index__title
      | 食材検索
    organisms-search

  section.foodItems-index__block
    h2.foodItems-index__title
      | 検索結果

    .foodItems-index__searching(v-if='isSearching') 検索中
    .foodItems-index__error(v-else-if='hasError') エラーがありました
    .foodItems-index__error(v-else-if='!foodItems.length') {{ noResultText }}
    template(v-else)
      ul.foodItems-index__list
        li(v-for='foodItem in foodItems')
          nuxt-link(
            :to='{ name: "foodItems-id", params: { id: foodItem.id } }'
          )
            | {{ foodItem.nameWithProvider }}
      .foodItems-index__more(@click='showMore')
        | 次の{{ limit }}件を表示
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PagesFoodItemsIndex',
  data(): {
    hasError: boolean
    noResultText: string
  } {
    return {
      hasError: false,
      noResultText: '',
    }
  },
  computed: {
    foodItems() {
      return this.$store.state.search.foodItems
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
.foodItems-index {
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
}
</style>
