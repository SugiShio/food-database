<template lang="pug">
.o-daily(v-if='daily')
  div(@click='submit') submit
  fd-title
    time(:datetime='`${daily.year}-${daily.month}-${daily.date}`') {{ daily.year }}.{{ daily.month }}.{{ daily.date }}

  organisms-nutrients-summary(:nutrients='{}')

  button.o-daily__add-button(type='button', @click='addDailyItem')
    i.icon-plus-circle.o-daily__add-icon
    | 食事を記録

  ul
    li.o-daily__item(v-for='(item, index) in daily.items')
      organisms-daily-item(
        :daily-item='item',
        @daily-item-submit='submit',
        @edit-clicked='editDailyItem(index)'
      )

  fd-window(:is-show='!!editingDailyItem')
    organisms-daily-item-edit(
      :daily-item='editingDailyItem',
      @add-button-clicked='isSearchModalShow = true',
      @cancel-clicked='editingDailyItem = null'
    )

  transition(name='slidein')
    .o-daily__search-modal(v-if='isSearchModalShow')
      div(@click='closeSearchModal') 閉じる
      organisms-search
      ul.o-daily__list
        li(v-for='foodItem in foodItems')
          button(type='button', @click='addFoodItem(foodItem)')
            i.icon-plus-circle.o-daily__add-icon
          | {{ foodItem.name }}
</template>

<script lang="ts">
import { setDoc, collection, doc, getDoc } from 'firebase/firestore'
import { db, getFirestoreFormat } from '@/plugins/firebase'
import Vue from 'vue'
import { Daily } from '@/models/daily'
import { DailyItem } from '~/models/dailyItem'

export default Vue.extend({
  name: 'OrganismsDailyId',
  props: {
    id: { type: String, required: true },
    uid: { type: String, required: true },
  },
  data(): {
    daily: Daily | null
    editingDailyItem: Daily | null
    isSearchModalShow: boolean
  } {
    return {
      daily: null,
      editingDailyItem: null,
      isSearchModalShow: false,
    }
  },
  computed: {
    foodItems() {
      return this.$store.state.search.foodItems
    },
  },
  async created() {
    this.fetchDaily()
  },
  methods: {
    addDailyItem() {
      this.editingDailyItem = new DailyItem()
    },
    addFoodItem(foodItem) {
      this.editingDailyItem.addFoodItem(foodItem)
    },
    async fetchDaily() {
      try {
        const docSnap = await getDoc(
          doc(db, 'users', this.uid, 'daily', this.id)
        )
        if (docSnap?.exists()) {
          const data = docSnap.data()
          this.daily = new Daily(this.id, data)
        } else {
          this.daily = new Daily(this.id)
        }
      } catch (e) {
        console.error(e)
      }
    },
    closeSearchModal() {
      this.$store.commit('search/resetFoodItems')
      this.isSearchModalShow = false
    },
    editDailyItem(index: number) {
      this.editingDailyItem = this.daily?.items[index]
    },
    async submit() {
      if (!this.daily) return
      try {
        const data = getFirestoreFormat(this.daily)
        await setDoc(
          doc(collection(db, 'users', this.uid, 'daily'), this.id),
          data
        )
      } catch (e) {
        console.error(e)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.o-daily {
  padding: 30px 20px 50px;

  &__link {
    position: relative;
    padding-left: 15px;
    color: $color-text-weak;
    transition: 0.3;
  }

  &__item {
    margin: 20px 0;
    transition: box-shadow 0.3s;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 10px rgba(#000, 0.05);
    }
  }

  &__add-button {
    display: block;
    margin: auto;
    color: $color-text-weak;
  }

  &__add-icon {
    font-size: 1.3em;
    margin-right: 5px;
  }

  &__search-modal {
    position: fixed;
    top: 50%;
    right: 10px;
    left: 10px;
    padding: 20px 10px;
    height: 50%;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(#000, 0.05);
    overflow-y: scroll;

    &.slidein-enter-active,
    &.slidein-leave-active {
      transition: 0.3s;
    }
    &.slidein-enter,
    &.slidein-leave-to {
      opacity: 0;
      transform: translateY(100%);
    }
  }
}
</style>
