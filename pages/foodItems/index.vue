<template lang="pug">
.foodItems-index
  section.foodItems-index__block
    h2.foodItems-index__title
      | 食材検索
    organisms-search(
      @search-start='isSearching = true',
      @search-succeed='onSearchSucceed',
      @search-failed='onSearchFailed'
    )

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
      //- todo
      //- .foodItems-index__more(@click='search')
        | 次の{{ limit }}件を表示
</template>

<script lang="ts">
import Vue from 'vue'
import { FoodItem, TYPES } from '@/models/foodItem'
import { RadioOption } from '~/models/radioOption'

export default Vue.extend({
  name: 'PagesFoodItemsIndex',
  data(): {
    foodItems: FoodItem[]
    hasError: boolean
    isSearching: boolean
    keyword: string
    limit: number
    noResultText: string
    types: string[]
    typeOptions: RadioOption[]
  } {
    return {
      foodItems: [],
      hasError: false,
      isSearching: false,
      keyword: '',
      limit: 10,
      noResultText: '',
      types: [],
      typeOptions: TYPES,
    }
  },
  methods: {
    onSearchSucceed(foodItems: FoodItem[]) {
      this.foodItems = foodItems
      this.isSearching = false
    },
    onSearchFailed() {
      this.hasError = true
      this.isSearching = false
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
