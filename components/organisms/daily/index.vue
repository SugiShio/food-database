<template lang="pug">
.o-daily(v-if='daily')
  div(@click='submit') submit
  fd-title
    time(:datetime='`${daily.year}-${daily.month}-${daily.date}`') {{ daily.year }}.{{ daily.month }}.{{ daily.date }}

  organisms-nutrients-summary(:nutrients='{}')

  ul
    li.o-daily__item(v-for='(item, index) in daily.items')
      organisms-daily-item(
        :daily-item='item',
        :is-editing='isEditingDailyItem(index)',
        @daily-item-submit='submit',
        @edit-clicked='editDailyItem(index)'
      )
</template>

<script lang="ts">
import { setDoc, collection, doc, getDoc } from 'firebase/firestore'
import { db, getFirestoreFormat } from '@/plugins/firebase'
import Vue from 'vue'
import { Daily } from '@/models/daily'

export default Vue.extend({
  name: 'OrganismsDailyId',
  props: {
    id: { type: String, required: true },
    uid: { type: String, required: true },
  },
  data(): { daily: Daily | null; editingDailyItemIndex: number | null } {
    return {
      daily: null,
      editingDailyItemIndex: null,
    }
  },
  async created() {
    this.fetchDaily()
  },
  methods: {
    addDailyItem() {
      this.daily?.addItem()
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
    editDailyItem(index: number) {
      this.editingDailyItemIndex = index
    },
    isEditingDailyItem(index: number) {
      return index === this.editingDailyItemIndex
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
  padding: 20px 10px 40px;

  &__link {
    position: relative;
    padding-left: 15px;
    color: $color-text-weak;
    transition: 0.3;
  }

  &__item {
    padding: 10px 20px;
    margin: 20px 0;
    transition: box-shadow 0.3s;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 10px rgba(#000, 0.05);
    }
  }
}
</style>
