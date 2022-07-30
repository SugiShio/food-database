<template lang="pug">
main.foodItems-id(v-if='foodItem')
  nuxt-link.foodItems-id__link(:to={ name: "foodItems" }) Index

  .foodItems-id__title-container
    input-text(v-if='isEditing', v-model='foodItem.name', size='large')
    fd-title(v-else, :text='foodItem.name') {{ foodItem.name }}
    fd-button(
      v-if='isEditable',
      label='Edit',
      type='button',
      @button-clicked='isEditing = true'
    )

  section.foodItems-id__section
    h2.foodItems-id__title 基本情報
    .foodItems-id__item
      .foodItems-id__label(:class='{ isEditing }')
        label(for='description') 説明
      .foodItems-id__item-body
        input-textarea(
          v-if='isEditing',
          :value='foodItem.description',
          @input='onInput($event, "description")'
        )
        template(v-else)
          | {{ foodItem.description }}

    .foodItems-id__item
      .foodItems-id__label(:class='{ isEditing }')
        label(for='type') タイプ
      .foodItems-id__item-body
        input-radio(
          v-if='isEditing',
          :options='foodItemTypes',
          :value='foodItem.type',
          @input='onInput($event, "type")'
        )
        template(v-else)
          | {{ foodItem.typeLabel }}

    .foodItems-id__item(v-if='isEditing')
      .foodItems-id__label(:class='{ isEditing }')
        | キーワード
      .foodItems-id__item-body
        input-text-array(
          v-if='isEditing',
          v-model='foodItem.keywords',
          @text-array-input='onTextArrayInput($event, "keywords")'
        )

  section.foodItems-id__section
    h2.foodItems-id__title 栄養素

    .foodItems-id__amount(v-if='!isEditing')
      input.foodItems-id__amount-input(v-model='rate', type='number')
      | gあたり

    ul.foodItems-id__
      li.foodItems-id__item(v-for='(nutrient, index) in foodItem.nutrients')
        .foodItems-id__label(:class='{ isEditing }')
          label(:for='nutrient.nutrientId') {{ nutrient.label }}
        .foodItems-id__item-body
          input-number(
            v-if='isEditing',
            v-model='nutrient.value',
            :unit='nutrient.unit',
            @input='onNutrientValueInput($event, index)'
          )
          number-with-unit(
            v-else,
            :number='(nutrient.value * rate) / 100',
            :unit='nutrient.unit'
          )

  fd-button(label='Cancel', v-if='isEditing', @button-clicked='onCancel')
  fd-button(label='Submit', v-if='isEditing', @button-clicked='submit')
</template>

<script lang="ts">
import Vue from 'vue'
import { FoodItem, TYPES } from '@/models/foodItem'
import { getFirestoreFormat } from '@/utils/firestore'
import { NUTRIENTS } from '~/models/nutrient/constants'

export default Vue.extend({
  name: 'PagesFoodItemsId',
  data(): {
    foodItem: FoodItem | null
    isEditing: boolean
    postItem: Object
    rate: number
  } {
    return {
      foodItem: null,
      isEditing: false,
      postItem: {},
      rate: 100,
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
      const data = getFirestoreFormat(this.postItem)

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
    onInput(value: Event, key: string) {
      this.$set(this.postItem, key, value)
      this.foodItem[key] = value
    },
    onNutrientValueInput(value: string, index: number) {
      const SEPARATORS = /\n|\t|,/
      const values = value.split(SEPARATORS).map((v) => {
        const number = Number(v)
        return isNaN(number) ? '' : number
      })
      const changedNutrients = values.map((value, i) => {
        return {
          nutrientId: Object.keys(NUTRIENTS)[index + i],
          value,
        }
      })

      const postNutrients = this.postItem.nutrients || [
        ...this.foodItem?.nutrients,
      ]
      postNutrients.splice(index, values.length, ...changedNutrients)
      this.$set(this.postItem, 'nutrients', postNutrients)
      this.foodItem?.nutrients.forEach((n, i) => {
        n.value = postNutrients[i].value
      })
    },
    onTextArrayInput(payload: { value: string; index: -1 }, key: string) {
      if (!this.foodItem || !this.foodItem[key]) return
      if (payload.index > -1) {
        if (payload.value) {
          this.foodItem[key].splice(payload.index, 1, payload.value)
        } else {
          this.foodItem[key].splice(payload.index, 1)
        }
      } else if (payload.value) {
        this.foodItem[key].push(payload.value)
      }
      this.$set(this.postItem, key, this.foodItem?.keywords)
    },
  },
})
</script>

<style lang="scss" scoped>
.foodItems-id {
  padding: 30px 20px;

  &__link {
    position: relative;
    padding-left: 15px;
    color: $color-text-weak;
    transition: 0.3;

    &:hover {
      color: $color-main;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 3px;
      margin: auto;
      border-bottom: 1px solid;
      border-left: 1px solid;
      transform: rotate(45deg);
      width: 6px;
      height: 6px;
    }
  }

  &__title-container {
    display: flex;
    margin: 30px 0;
    width: 100%;
    align-items: center;
    justify-content: space-between;
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

    &.isEditing {
      padding-top: 6px;
    }
  }

  &__item-body {
    flex-grow: 1;
    overflow: hidden;
  }

  &__amount {
    margin: 15px 0;
    display: flex;
    align-items: center;
  }

  &__amount-input {
    margin-right: 5px;
    padding: 5px 10px;
    width: 100px;
    border: 1px solid $color-grey-weak;
    background-color: transparent;
    border-radius: 3px;
  }
}
</style>
