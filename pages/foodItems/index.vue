<template lang="pug">
ul
  li(v-for='foodItem in foodItems')
    nuxt-link(:to='{ name: "foodItems-id", params: { id: foodItem.id } }')
      | {{ foodItem.name }}
</template>

<script lang="ts">
import Vue from 'vue'
import { FoodItem } from '@/models/foodItem'
import { FirebaseHelper } from '@/plugins/firebase'

export default Vue.extend({
  name: 'PagesFoodItemsIndex',
  data(): { foodItems: FoodItem[] } {
    return {
      foodItems: [],
    }
  },
  async created() {
    try {
      const querySnapshot = await FirebaseHelper.fetchIndex('foodItems')
      querySnapshot.forEach((doc) => {
        this.foodItems.push(new FoodItem(doc.id, doc.data()))
      })
    } catch (_) {}
  },
})
</script>
