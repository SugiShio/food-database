<template lang="pug">
div(v-if='foodItem')
  button(v-if='!isEditing', type='button', @click='isEditing = !isEditing') Edit
  div
    input(v-model='foodItem.name', :disabled='!isEditing')
  div
    textarea(v-model='foodItem.description', :disabled='!isEditing')
  div(v-for='nutrient in foodItem.nutrients')
    number-editor(
      v-model='nutrient.value',
      :label='nutrient.label',
      :disabled='!isEditing'
    )
  button(v-if='isEditing', @click='submit') Submit
</template>

<script lang="ts">
import Vue from 'vue'
import { FoodItem } from '@/models/foodItem'

export default Vue.extend({
  name: 'PagesFoodItemsId',
  data(): { foodItem: FoodItem | null; isEditing: boolean } {
    return {
      foodItem: null,
      isEditing: false,
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
  methods: {
    submit() {
      if (!this.foodItem) return
      const db = this.$fire.firestore
      const data = {
        ...this.foodItem,
        nutrients: this.foodItem.nutrients.map((n) => {
          return { ...n }
        }),
      }
      db.collection('foodItems')
        .doc(this.id)
        .update(data)
        .then(() => {
          console.log('Item successfully updated! 🍅')
        })
    },
  },
})
</script>
