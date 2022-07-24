<template lang="pug">
main.foodItems-id(v-if='foodItem')
  .foodItems-id__title-container
    text-editor(
      v-model='foodItem.name',
      id-attribute='title',
      :is-editing='isEditing',
      size='large',
      html-tag='h1'
    )
    fd-button(
      v-if='isEditable',
      label='Edit',
      type='button',
      @button-clicked='isEditing = true'
    )
  section.foodItems-id__section
    h2.foodItems-id__title 基本情報
    .foodItems-id__item
      .foodItems-id__label
        label(for='description') 説明
      .foodItems-id__item-body
        textarea-editor(
          v-model='foodItem.description',
          :is-editing='isEditing',
          id-attribute='description'
        )

  section.foodItems-id__section
    h2.foodItems-id__title 栄養素
    ul.foodItems-id__
      li.foodItems-id__item(v-for='nutrient in foodItem.nutrients')
        .foodItems-id__label
          label(:for='nutrient.nutrientId') {{ nutrient.label }}
        .foodItems-id__item-body
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
    isEditable() {
      return this.$store.state.isSignin && !this.isEditing
    },
    isNew() {
      return this.id === 'new'
    },
  },
  async created() {
    const db = this.$fire.firestore
    if (this.isNew) {
      this.isEditing = true
      this.foodItem = new FoodItem()
    } else {
      db.collection('foodItems')
        .doc(this.id)
        .get()
        .then((doc) => {
          const data = doc.data()
          if (data) this.foodItem = new FoodItem(this.id, data)
        })
    }
  },
  methods: {
    submit() {
      if (!this.foodItem) return
      if (this.isNew) {
        this.create()
      } else {
        this.update()
      }
    },
    create() {
      const db = this.$fire.firestore
      const data = getFirestoreFormat(this.foodItem)
      db.collection('foodItems')
        .add(data)
        .then((doc) => {
          this.$router.push({
            name: 'foodItems-id',
            params: { id: doc.id },
          })
        })
    },
    update() {
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
  padding: 30px 20px;

  &__title-container {
    display: flex;
    width: 100%;
    align-items: center;
  }

  &__section {
    margin: 30px 0;
  }

  &__title {
    font-weight: bold;
    margin: 10px 0;
  }

  &__item {
    margin: 15px 0;
    display: flex;
  }

  &__label {
    flex-shrink: 0;
    width: 150px;
  }

  &__item-body {
    flex-grow: 1;
  }
}
</style>
