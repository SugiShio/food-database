<template lang="pug">
main.foodItems-id(v-if='foodItem')
  section
    h2 基本情報
    .foodItems-id__title-container
      text-editor(
        v-model='foodItem.name',
        id-attribute='title',
        :is-editing='isEditing'
      )
      fd-button(
        label='Edit',
        v-if='!isEditing',
        type='button',
        @button-clicked='isEditing = !isEditing'
      )
    div
      label(for='description') 説明
      textarea-editor(
        v-model='foodItem.description',
        :is-editing='isEditing',
        id-attribute='description'
      )

  section
    h2 栄養素
    ul.foodItems-id__
      li(v-for='nutrient in foodItem.nutrients')
        label(:for='nutrient.nutrientId') {{ nutrient.label }}
        number-editor(
          v-model='nutrient.value',
          :is-editing='isEditing',
          :id-attribute='nutrient.nutrientId',
          :unit='nutrient.unit'
        )
  fd-button(
    label='Cancel',
    v-if='isEditing',
    @button-clicked='isEditing = false'
  )
  fd-button(label='Submit', v-if='isEditing', @button-clicked='submit')
</template>

<script lang="ts">
import Vue from 'vue'
import { FoodItem } from '@/models/foodItem'
import { getFirestoreFormat } from '@/utils/firestore'

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
      const data = getFirestoreFormat(this.foodItem)
      db.collection('foodItems')
        .doc(this.id)
        .update(data)
        .then(() => {
          console.log('Item successfully updated! 🍅')
          this.isEditing = false
        })
    },
  },
})
</script>

<style lang="scss" scoped>
.foodItems-id {
  &__title-container {
    display: flex;
    width: 100%;
    align-items: center;
  }
}
</style>
