<template lang="pug">
main.recipes-id(v-if='recipe')
  //- todo パンクズとしてコンポーネントに切り出し
  nuxt-link.recipes-id__link(:to={ name: "recipes" }) Index

  .recipes-id__title-container
    input-text(
      v-if='isEditing',
      v-model='recipe.name',
      size='large',
      @input='onInput($event, "name")'
    )
    fd-title(v-else, :text='recipe.name') {{ recipe.name }}
    fd-button(
      v-if='isEditable',
      label='Edit',
      type='button',
      @button-clicked='isEditing = true'
    )

  section.recipes-id__section
    h2.recipes-id__title 基本情報
    .recipes-id__item
      .recipes-id__item-label(:class='{ isEditing }')
        label(for='description') 説明
      .recipes-id__item-body
        input-textarea(
          v-if='isEditing',
          :value='recipe.description',
          @input='onInput($event, "description")'
        )
        template(v-else)
          | {{ recipe.description }}

  section.recipes-id__section
    h2.recipes-id__title 材料
    ul
      li.recipes-id__item(v-for='(item, index) in recipe.items')
        label.recipes-id__item-label(:class='{ isEditing }')
          | {{ recipeFoodItems[index].name }}
        .recipes-id__item-body
          input-number(
            v-if='isEditing',
            v-model='item.amount',
            unit='g',
            @input='onItemAmountInput(index)'
          )
          template(v-else)
            | {{ item.amount }} g

  section.recipes-id__section(v-if='isEditing')
    h2.recipes-id__title 食材
    ul
      li(v-for='foodItem in foodItems')
        div
          | {{ foodItem.name }}
          button(type='button', @click='addItem(foodItem)') +

  section.recipes-id__section(v-if='!isEditing')
    h2.recipes-id__title 栄養成分
    ul
      li.recipes-id__item(v-for='nutrient in nutrients')
        label.recipes-id__item-label
          | {{ nutrient.label }}

        .recipes-id__item-body
          .recipes-id__item-number
            number-with-unit(
              :decimal-digit='2',
              :number='nutrientSum(nutrient)',
              :unit='nutrient.unit'
            )
          .recipes-id__item-bar
            graph-bar(
              :max='nutrientBasis(nutrient)',
              :values='nutrientValues(nutrient)',
              :labels='itemLabels(nutrient)'
            )

  ul.recipes-id__buttons(v-if='isEditing')
    li.recipes-id__button
      fd-button(label='Cancel', type='secondary', @button-clicked='onCancel')
    li.recipes-id__button
      fd-button(label='Submit', @button-clicked='submit')
</template>

<script lang="ts">
import Vue from 'vue'
import { Recipe, RecipeItem } from '@/models/recipe'
import { FirebaseHelper } from '@/plugins/firebase'
import { FoodItem } from '@/models/foodItem'
import { NUTRIENTS } from '@/models/nutrient/constants'
import { NUTRIENT_BASIS } from '~/models/nutrientBasis/constants'

export default Vue.extend({
  name: 'PagesrecipesId',
  data(): {
    foodItems: FoodItem[]
    isEditing: boolean
    recipe: Recipe | null
    recipeFoodItems: FoodItem[]
    postItem: {
      id?: string
      name?: string
      description?: string
      items?: RecipeItem[]
    }
  } {
    return {
      foodItems: [],
      isEditing: false,
      recipe: null,
      recipeFoodItems: [],
      postItem: {},
    }
  },
  computed: {
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
      return Object.keys(NUTRIENTS).map((key) => {
        const nutrient = NUTRIENTS[key]
        const items = this.recipeFoodItems.map((recipeFoodItem, index) => {
          if (!recipeFoodItem.nutrients) return {}
          const nutrientData = recipeFoodItem.nutrients.find(
            (n) => n.nutrientId === key
          )
          const value =
            (nutrientData.value * this.recipe?.items[index].amount) / 100
          return { label: recipeFoodItem.name, value }
        })
        return { nutrientId: key, ...nutrient, items }
      })
    },
  },
  async created() {
    await this.initialize()
    await this.fetchFoodItems()
  },
  methods: {
    async initialize() {
      await this.fetchRecipe()
      await this.fetchRecipeFoodItems()
    },
    async addItem(item: FoodItem, amount = 100) {
      if (!this.recipe) return
      try {
        const foodItem = await this.getFoodItem(item.id)
        this.recipeFoodItems.push(new FoodItem(item.id, foodItem))
        this.recipe.addItem(item, amount)
        this.$set(this.postItem, 'items', this.recipe.items)
      } catch (_) {}
    },
    async fetchFoodItems() {
      try {
        const querySnapshot = await FirebaseHelper.fetchIndex('foodItems')
        querySnapshot.forEach((doc) => {
          this.foodItems.push(new FoodItem(doc.id, doc.data()))
        })
      } catch (_) {}
    },
    async fetchRecipe() {
      if (this.isNew) {
        this.isEditing = true
        this.recipe = new Recipe()
      } else {
        try {
          const doc = await FirebaseHelper.fetchItem('recipes', this.id)
          const data = doc.data()
          this.recipe = new Recipe(this.id, data)
          this.recipeFoodItems = Array(this.recipe?.items.length).fill({})
        } catch (_) {}
      }
    },
    async getFoodItem(id: string) {
      try {
        const doc = await FirebaseHelper.fetchItem('foodItems', id)
        const data = doc.data()
        return new FoodItem(this.id, data)
      } catch (_) {}
    },
    async fetchRecipeFoodItems() {
      this.recipe?.items.forEach(async (item, index) => {
        try {
          const doc = await FirebaseHelper.fetchItem('foodItems', item.id)
          const data = doc.data()
          this.recipeFoodItems.splice(index, 1, new FoodItem(this.id, data))
        } catch (_) {}
      })
    },
    itemLabels(nutrient) {
      return nutrient.items.map((item) => item.label)
    },
    nutrientBasis(nutrient: Nutrient) {
      const nutrientBasis = NUTRIENT_BASIS.find(
        (n) => n.nutrientID === nutrient.nutrientId
      )
      return nutrientBasis ? nutrientBasis.DietaryReferenceIntake : 100
    },
    nutrientSum(nutrient) {
      return nutrient.items.reduce((sum, item) => {
        return sum + item.value
      }, 0)
    },
    nutrientValues(nutrient) {
      return nutrient.items.map((item) => item.value)
    },
    submit() {
      if (!this.recipe) return
      if (this.isNew) {
        this.create()
      } else {
        this.update()
      }
    },
    async create() {
      try {
        const doc = await FirebaseHelper.create('recipes', this.postItem)

        this.$router.push({
          name: 'recipes-id',
          params: { id: doc.id },
        })
      } catch (_) {}
    },
    async update() {
      if (!this.recipe) return
      try {
        FirebaseHelper.update('recipes', this.recipe?.id, this.postItem)
        console.log('Item successfully updated! 🍅')
        this.initialize()
        this.isEditing = false
      } catch (_) {}
    },
    onCancel() {
      this.isEditing = false
      this.initialize()
    },
    onInput(value: string, key: string) {
      if (!this.recipe) return
      this.$set(this.postItem, key, value)
      this.recipe[key] = value
    },
    onItemAmountInput(index: number) {
      if (!this.recipe) return
      const items = this.recipe.items
      items.splice(index, 1, this.recipe.items[index])
      this.$set(this.postItem, 'items', items)
    },
  },
})
</script>

<style lang="scss" scoped>
.recipes-id {
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

  &__item-number {
    width: 100px;
    flex-shrink: 0;
  }

  &__item-bar {
    flex-grow: 1;
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
