<template lang="pug">
main.recipes-id(v-if='recipe')
  //- todo パンクズとしてコンポーネントに切り出し
  nuxt-link.recipes-id__link(:to={ name: "recipes" }) Index
  .recipes-id__title-container
    input-text(v-if='isEditing', v-model='recipe.name', size='large')
    fd-title(v-else) {{ recipe.name }}
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
        input-textarea(v-if='isEditing', :value='recipe.description')
        template(v-else)
          | {{ recipe.description }}
  section.recipes-id__section
    h2.recipes-id__title 材料
    ul
      li.recipes-id__item(v-for='(item, index) in recipe.items')
        label.recipes-id__item-label(:class='{ isEditing }')
          | {{ item.foodItem.name }}
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
    h2.recipes-id__title 栄養素
    organisms-nutrient-graph(
      :nutrients='recipe.nutrients',
      :nutrient-basis='nutrientBasis'
    )

  ul.recipes-id__buttons(v-if='isEditing')
    li.recipes-id__button
      fd-button(label='Cancel', type='secondary', @button-clicked='onCancel')
    li.recipes-id__button
      fd-button(label='Submit', @button-clicked='submit')
</template>

<script lang="ts">
import Vue from 'vue'
import { Recipe } from '@/models/recipe'
import { FirebaseHelper } from '@/plugins/firebase'
import { FoodItem } from '@/models/foodItem'
import { NUTRIENT_BASIS } from '~/models/nutrientBasis/constants'

export default Vue.extend({
  name: 'PagesrecipesId',
  data(): {
    foodItems: FoodItem[]
    isEditing: boolean
    recipe: Recipe | null
  } {
    return {
      foodItems: [],
      isEditing: false,
      recipe: null,
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
    nutrientBasis() {
      return NUTRIENT_BASIS
    },
    nutrientItems(): { nutrientId: string; values: number[] }[] {
      if (!this.recipe) return []
      const recipe = this.recipe
      return Object.keys(recipe.nutrients).map((key) => {
        return { nutrientId: key, values: recipe.nutrients[key] }
      })
    },
  },
  async created() {
    await this.fetchRecipe()
    await this.fetchFoodItems()
  },
  methods: {
    async addItem(item: FoodItem, amount = 100) {
      if (!this.recipe) return
      this.recipe.addItem(item, amount)
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
        } catch (_) {}
      }
    },
    async submit() {
      if (!this.recipe) return
      if (this.isNew) {
        this.create()
      } else {
        this.update()
      }
    },
    async create() {
      if (!this.recipe) return
      try {
        await this.recipe.setData()
        const doc = await FirebaseHelper.create('recipes', this.recipe)
        this.$router.push({
          name: 'recipes-id',
          params: { id: doc.id },
        })
      } catch (_) {}
    },
    async update() {
      if (!this.recipe) return
      try {
        await this.recipe.setData()
        FirebaseHelper.update('recipes', this.recipe?.id, this.recipe)
        console.log('Item successfully updated! 🍅')
        this.fetchRecipe()
        this.isEditing = false
      } catch (_) {}
    },
    onCancel() {
      this.fetchRecipe()
      this.isEditing = false
    },
    onItemAmountInput(index: number) {
      if (!this.recipe) return
      const items = this.recipe.items
      items.splice(index, 1, this.recipe.items[index])
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
