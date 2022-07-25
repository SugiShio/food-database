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

    .foodItems-id__item
      .foodItems-id__label
        label(for='type') タイプ
      .foodItems-id__item-body
        radio-editor(
          v-model='foodItem.type',
          :is-editing='isEditing',
          name-attribute='type',
          :options='foodItemTypes'
        )

  section.foodItems-id__section
    h2.foodItems-id__title 栄養素
    ul.foodItems-id__
      li.foodItems-id__item(v-for='(nutrient, index) in foodItem.nutrients')
        .foodItems-id__label
          label(:for='nutrient.nutrientId') {{ nutrient.label }}
        .foodItems-id__item-body
          number-editor(
            v-model='nutrient.value',
            :is-editing='isEditing',
            :id-attribute='nutrient.nutrientId',
            :index='index',
            :unit='nutrient.unit',
            ref='inputElement',
            @input='onNutrientValueInput($event, index)'
          )
  fd-button(label='Cancel', v-if='isEditing', @button-clicked='onCancel')
  fd-button(label='Submit', v-if='isEditing', @button-clicked='submit')
</template>

<script lang="ts">
import Vue from 'vue'
import { FoodItem, TYPES } from '@/models/foodItem'
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
    foodItemTypes() {
      return TYPES
    },
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
  created() {
    this.fetchFoodItem()
  },
  methods: {
    async fetchFoodItem() {
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
          this.fetchFoodItem()
          this.isEditing = false
        })
    },
    onCancel() {
      this.isEditing = false
      this.fetchFoodItem()
    },
    onNutrientValueInput(value: string, index: number) {
      const SEPARATORS = /\n|\t|,/
      const isMultipleValues = SEPARATORS.test(value)
      if (isMultipleValues) {
        const values = value.split(SEPARATORS)
        values.forEach((value, i) => {
          if (this.foodItem?.nutrients[index + i]) {
            this.foodItem?.nutrients[index + i].value = value
          }
        })
      }
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
    padding-top: 6px;
    width: 150px;
  }

  &__item-body {
    flex-grow: 1;
  }
}
</style>
