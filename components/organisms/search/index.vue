<template lang="pug">
.o-search
  .o-search-index__item
    .o-search-index__label キーワード
    input-text(v-model='keyword', @keydown-enter='onKeyDownEnter')

  //- .o-search-index__item
    .o-search-index__label タイプ
    checkbox-array(v-model='types', :options='typeOptions', inline)
  //- input(type='number', v-model='limit')

  .o-search-index__bottom
    fd-button(
      label='Search',
      @button-clicked='search',
      :disabled='isSearching'
    )
</template>

<script>
import Vue from 'vue'
import { TYPES } from '@/models/foodItem'

export default Vue.extend({
  name: 'OrganismsSearchIndex',
  data() {
    return {
      typeOptions: TYPES,
    }
  },
  computed: {
    isSearching() {
      return this.$store.state.search.isSearching
    },
    keyword: {
      get() {
        return this.$store.state.search.keyword
      },
      set(keyword) {
        this.$store.commit('search/setKeyword', { keyword })
      },
    },
    limit: {
      get() {
        return this.$store.state.search.limit
      },
      set(limit) {
        this.$store.commit('search/setLimit', { limit })
      },
    },
    types: {
      get() {
        return this.$store.state.search.types
      },
      set(types) {
        this.$store.commit('search/setTypes', { types })
      },
    },
  },
  created() {
    this.search()
  },
  methods: {
    onKeyDownEnter($event) {
      if ($event.isComposing) return
      this.search()
    },
    async search() {
      this.$store.commit('search/resetFoodItems')
      this.$store.dispatch('search/search')
    },
  },
})
</script>

<style lang="scss" scoped>
.o-search-index {
  &__item,
  &__bottom {
    margin: 10px 0;
  }

  &__label {
    font-size: 12px;
    margin-bottom: 3px;
  }

  &__bottom {
    text-align: center;
  }
}
</style>
