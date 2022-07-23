<template lang="pug">
ul
  li(v-for='foodItem in foodItems')
    nuxt-link(:to='{ name: "foodItems-id", params: { id: foodItem.id } }')
      | {{ foodItem.name }}
</template>

<script lang="ts">
import Vue from 'vue'
import { FoodItem } from '@/models/foodItem'

export default Vue.extend({
  name: 'PagesFoodItemsIndex',
  data(): { foodItems: FoodItem[] } {
    return {
      foodItems: [],
    }
  },
  async created() {
    const db = this.$fire.firestore

    db.collection('foodItems')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const documentData = doc.data()
          this.foodItems.push(new FoodItem(doc.id, documentData))
        })
      })
  },
})
</script>
