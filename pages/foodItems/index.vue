<template lang="pug">
.foodItems-index
  section.foodItems-index__block
    h2.foodItems-index__title
      | 食材検索
    .foodItems-index__search-item
      .foodItems-index__label キーワード
      input-text(v-model='keyword')

    .foodItems-index__search-item
      .foodItems-index__label タイプ
      checkbox-array(v-model='types', :options='typeOptions', inline)

    .foodItems-index__search-item
      fd-button(
        label='Search',
        @button-clicked='search',
        :disabled='isSearching'
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
import { FirebaseHelper } from '@/plugins/firebase'
import { WhereFilterOp } from '@firebase/firestore'
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
    async search() {
      this.isSearching = true
      this.foodItems = []
      this.noResultText = ''

      const wheres = []
      if (this.keyword)
        wheres.push({
          fieldPath: 'keywords',
          optStr: 'array-contains' as WhereFilterOp,
          value: this.keyword,
        })
      if (this.types.length)
        wheres.push({
          fieldPath: 'type',
          optStr: 'in' as WhereFilterOp,
          value: this.types,
        })

      try {
        const querySnapshot = await FirebaseHelper.search('foodItems', {
          wheres,
          ob: 'name',
        })
        querySnapshot.forEach((doc) => {
          this.foodItems.push(new FoodItem(doc.id, doc.data()))
        })
        if (!this.foodItems.length)
          this.noResultText = '検索条件に合う食材が見つかりませんでした。'
      } catch (e) {
        console.error(e)
        this.hasError = true
      } finally {
        this.isSearching = false
      }
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
