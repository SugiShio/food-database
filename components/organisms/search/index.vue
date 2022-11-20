<template lang="pug">
.o-search
  .o-search-index__item
    .o-search-index__label キーワード
    input-text(v-model='keyword')

  .o-search-index__item
    .o-search-index__label タイプ
    checkbox-array(v-model='types', :options='typeOptions', inline)

  .o-search-index__item
    fd-button(
      label='Search',
      @button-clicked='search',
      :disabled='isSearching'
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { FoodItem, TYPES } from '@/models/foodItem'
import { FirebaseHelper } from '@/plugins/firebase'
import { WhereFilterOp } from '@firebase/firestore'
import { RadioOption } from '~/models/radioOption'

export default Vue.extend({
  name: 'OrganismsSearchIndex',
  data(): {
    isSearching: boolean
    keyword: string
    limit: number
    types: string[]
    typeOptions: RadioOption[]
  } {
    return {
      isSearching: false,
      keyword: 'とうにゅう',
      limit: 10,
      types: [],
      typeOptions: TYPES,
    }
  },
  methods: {
    async search() {
      this.isSearching = true

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

      this.$emit('search-start')
      try {
        const querySnapshot = await FirebaseHelper.search('foodItems', {
          wheres,
          ob: 'name',
        })
        const result: FoodItem[] = []
        querySnapshot.forEach((doc) => {
          result.push(new FoodItem(doc.id, doc.data()))
        })
        this.$emit('search-succeed', result)
      } catch (e) {
        console.error(e)
        this.$emit('search-failed')
      } finally {
        this.isSearching = false
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.o-search-index {
  &__item {
    margin: 10px 0;
  }

  &__label {
    font-size: 12px;
    margin-bottom: 3px;
  }
}
</style>
