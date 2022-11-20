<template lang="pug">
.daily-id(v-if='daily')
  nuxt-link.daily-id__link(:to='{ name: "daily" }') Index
  time {{ daily.dateText }}

  ul
    li.daily-id__item
      button(type='button', @click='addDailyItem')
        | 食事を記録
    li.daily-id__item(v-for='(item, index) in daily.items')
      organisms-daily-item(
        :daily-item='item',
        :is-editing='isEditingDailyItem(index)',
        @daily-item-submit='submit',
        @edit-clicked='editDailyItem(index)'
      )
</template>

<script lang="ts">
import { FirebaseHelper } from '@/plugins/firebase'
import Vue from 'vue'
import { Daily } from '@/models/daily'

export default Vue.extend({
  name: 'PagesDailyId',
  data(): { daily: Daily | null; editingDailyItemIndex: number | null } {
    return {
      daily: null,
      editingDailyItemIndex: null,
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  created() {
    this.fetchDaily()
  },
  methods: {
    addDailyItem() {
      this.daily?.addItem()
    },
    async fetchDaily() {
      try {
        const doc = await FirebaseHelper.fetchItem('daily', this.id)
        const data = doc.data()
        this.daily = new Daily(this.id, data)
      } catch (_) {}
    },
    editDailyItem(index: number) {
      this.editingDailyItemIndex = index
    },
    isEditingDailyItem(index: number) {
      return index === this.editingDailyItemIndex
    },
    submit() {
      if (!this.daily) return
      // if (this.isNew) {
      //   this.create()
      // } else {
      this.update()
      // }
    },
    async create() {
      if (!this.daily) return
      try {
        const doc = await FirebaseHelper.create('daily', this.daily)
        this.$router.push({
          name: 'daily-id',
          params: { id: doc.id },
        })
      } catch (_) {}
    },
    update() {
      if (!this.daily) return
      try {
        FirebaseHelper.update('daily', this.daily?.id, this.daily)
        console.log('Item successfully updated! 🍅')
        this.fetchDaily()
        this.editingDailyItemIndex = null
      } catch (_) {}
    },
  },
})
</script>

<style lang="scss" scoped>
.daily-id {
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
