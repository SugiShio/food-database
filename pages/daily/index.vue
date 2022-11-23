<template lang="pug">
.daily-index
  input(type='number', v-model='year')
  input(type='number', v-model='month')
  ul 
    li(v-for='daily in dailys')
      nuxt-link(:to='{ name: "daily-id", params: { id: daily.id } }')
        | {{ daily.dateText }}
</template>

<script lang="ts">
import { FirebaseHelper } from '@/plugins/firebase'
import { WhereFilterOp } from '@firebase/firestore'

import Vue from 'vue'
import { Daily } from '@/models/daily'

export default Vue.extend({
  name: 'PagesDailyIndex',
  data(): { dailys: Daily[]; year: number; month: number } {
    return {
      dailys: [],
      year: 2022,
      month: 9,
    }
  },
  async created() {
    const auth = this.$fire.auth
    await auth.onAuthStateChanged((user) => {
      if (user) {
        this.fetchDailys(user.uid)
      }
    })
  },
  methods: {
    async fetchDailys(uid: string) {
      const startDate = new Date(this.year, this.month - 1)
      const endDate = new Date(this.year, this.month)

      try {
        const querySnapshot = await FirebaseHelper.search('daily', {
          wheres: [
            {
              fieldPath: 'uid',
              optStr: '==' as WhereFilterOp,
              value: uid,
            },
          ],
          ob: 'date.seconds',
          sa: startDate.getTime() / 1000 - 1,
          ea: endDate.getTime() / 1000,
        })

        querySnapshot.forEach((doc) => {
          const data = doc.data()
          this.dailys.push(new Daily(data.id, data))
        })
      } catch {}
    },
  },
})
</script>

<style lang="scss" scoped>
.daily-index {
  padding: 30px 20px 50px;
}
</style>
