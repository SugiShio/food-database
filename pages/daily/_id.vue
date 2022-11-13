<template lang="pug">
.daily-id(v-if='daily')
  time {{ daily.dateText }}
  ul
    li(v-for='item in daily.items')
      div {{ item.mark }}
      div {{ item.timeText }}
      ul
        li(v-for='foodItem in item.foodItems')
          div {{ foodItem.name }}
</template>

<script lang="ts">
import { FirebaseHelper } from '@/plugins/firebase'
import Vue from 'vue'
import { Daily } from '@/models/daily'

export default Vue.extend({
  name: 'PagesDailyId',
  data(): { daily: Daily | null } {
    return {
      daily: null,
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
    async fetchDaily() {
      try {
        const doc = await FirebaseHelper.fetchItem('daily', this.id)
        const data = doc.data()
        this.daily = new Daily(this.id, data)
      } catch (_) {}
    },
  },
})
</script>

<style lang="scss" scoped>
.daily-id {
  padding: 30px 20px 50px;
}
</style>
