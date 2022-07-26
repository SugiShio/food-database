<template lang="pug">
main.foodItems-id(v-if='foodItem')
  nuxt-link.foodItems-id__link(:to={ name: "foodItems" }) Index

  .foodItems-id__title-container
    input-text(
      v-if='isEditing',
      v-model='foodItem.name',
      size='large',
      @input='onInput($event, "name")'
    )
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
      .foodItems-id__item-label(:class='{ isEditing }')
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
      .foodItems-id__item-label(:class='{ isEditing }')
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

    .foodItems-id__item
      .foodItems-id__item-label(:class='{ isEditing }')
        label(for='provider') メーカー、店名等
      .foodItems-id__item-body
        input-text(v-if='isEditing', v-model='foodItem.provider')
        template(v-else)
          | {{ foodItem.provider }}

    .foodItems-id__item(v-if='isEditing')
      .foodItems-id__item-label(:class='{ isEditing }')
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

    template(v-if='isEditing')
      organisms-input-nutrients(v-model='foodItem.nutrients')

    organisms-nutrient-graph(
      v-else,
      :nutrients='nutrients',
      :nutrient-basis='nutrientBasis'
    )

  ul.foodItems-id__buttons(v-if='isEditing')
    li.foodItems-id__button
      fd-button(label='Cancel', type='secondary', @button-clicked='onCancel')
    li.foodItems-id__button
      fd-button(label='Submit', @button-clicked='submit')
</template>

<script lang="ts">
import Vue from 'vue'
import { FoodItem, TYPES } from '@/models/foodItem'
import { Nutrient } from '@/models/nutrient'
import { NUTRIENTS } from '@/models/nutrient/constants'
import { NUTRIENT_BASIS } from '@/models/nutrientBasis/constants'
import { FirebaseHelper } from '@/plugins/firebase'

export default Vue.extend({
  name: 'PagesFoodItemsId',
  data(): {
    foodItem: FoodItem | null
    isEditing: boolean
    rate: number
  } {
    return {
      foodItem: null,
      isEditing: false,
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
    isEditable(): boolean {
      return this.$store.state.isSignin && !this.isEditing
    },
    isNew(): boolean {
      return this.id === 'new'
    },
    nutrients() {
      const result: { [key: string]: number[] } = {}
      Object.keys(NUTRIENTS).forEach((key) => {
        const nutrient = this.foodItem?.nutrients.find(
          (n) => n.nutrientId === key
        )
        const value = nutrient ? nutrient.value || 0 : 0
        result[key] = [(value * this.rate) / 100]
      })
      return result
    },
    nutrientBasis() {
      return NUTRIENT_BASIS
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
        try {
          const doc = await FirebaseHelper.fetchItem('foodItems', this.id)
          const data = doc.data()
          this.foodItem = new FoodItem(this.id, data)
        } catch (_) {}
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
    async create() {
      if (!this.foodItem) return
      try {
        const doc = await FirebaseHelper.create('foodItems', this.foodItem)
        this.$router.push({
          name: 'foodItems-id',
          params: { id: doc.id },
        })
      } catch (_) {}
    },
    update() {
      if (!this.foodItem) return
      try {
        FirebaseHelper.update('foodItems', this.foodItem?.id, this.foodItem)
        console.log('Item successfully updated! 🍅')
        this.fetchFoodItem()
        this.isEditing = false
      } catch (_) {}
    },
    onCancel() {
      this.isEditing = false
      this.fetchFoodItem()
    },
    onInput(value: string, key: string) {
      if (!this.foodItem) return
      this.foodItem[key] = value
    },
    onTextArrayInput(
      { value, index = -1 }: { value: string; index?: number },
      key: string
    ) {
      if (!this.foodItem || !this.foodItem[key]) return
      if (index > -1) {
        if (value) {
          ;(this.foodItem[key] as string[]).splice(index, 1, value)
        } else {
          ;(this.foodItem[key] as string[]).splice(index, 1)
        }
      } else if (value) {
        ;(this.foodItem[key] as string[]).push(value)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.foodItems-id {
  padding: 30px 20px 50px;

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
    @extend .title-container;
    margin: 30px 0;
  }

  &__section {
    margin: 30px 0;
  }

  &__title {
    font-weight: bold;
    margin: 10px 0;
  }

  &__item {
    @extend .list__item;
    margin: 15px 0;
  }

  &__item-label {
    @extend .list__item-label;
  }

  &__item-body {
    @extend .list__item-body;
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

  &__buttons {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    margin: auto;
    padding: 10px 0;
    background-color: #fff;
    border-top: 1px solid $color-grey;
  }

  &__button + &__button {
    margin-left: 30px;
  }
}
</style>
