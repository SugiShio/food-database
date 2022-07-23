<template lang="pug">
div {{ foodItem }}
</template>

<script lang="ts">
import Vue from 'vue'
import { FoodItem } from '@/models/foodItem'

export default Vue.extend({
  name: 'PagesFoodItemsId',
  data(): { foodItem: FoodItem | null } {
    return {
      foodItem: null,
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  async created() {
    const db = this.$fire.firestore

    db.collection('foodItems')
      .doc(this.id)
      .get()
      .then((doc) => {
        const data = doc.data()
        if (data) this.foodItem = new FoodItem(this.id, data)
      })
  },
})
</script>
