<template lang="pug">
main.recipes-id(v-if='recipe')
  //- todo パンクズとしてコンポーネントに切り出し
  nuxt-link.recipes-id__link(:to='{ name: "recipes" }') Index
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
      li.recipes-id__item(v-for='(item, index) in recipeItems')
        | {{ item.name }}
        template(v-if='isEditing')
          input(v-model='item.amount')
          select(v-model='item.unit')
            option(v-for='unitOption in item.units', :value='unitOption.unit')
              | {{ unitOption.unit }}
        template(v-else)
          | ({{ item.amount }}{{ item.unit }})
    button(v-if='isEditing', type='button', @click='openSearchForm') + Add item

  ul.recipes-id__buttons(v-if='isEditing')
    li.recipes-id__button
      fd-button(label='Cancel', type='secondary', @button-clicked='onCancel')
    li.recipes-id__button
      fd-button(label='Submit', @button-clicked='submit')

  fd-window(
    :is-show='isSearchFormOpen',
    @close-clicked='isSearchFormOpen = false'
  )
    organisms-search
    ul
      li(v-for='foodItem in foodItems', @click='addRecipeItem(foodItem)')
        | {{ foodItem.name }}
</template>

<script>
import Vue from 'vue'
import { Recipe } from '@/models/recipe'
import { FirebaseHelper } from '@/plugins/firebase'
import { FoodItem } from '@/models/foodItem'

export default Vue.extend({
  name: 'PagesRecipesId',
  data() {
    return {
      isEditing: false,
      recipe: new Recipe(),
      isSearchFormOpen: false,
      recipeItems: [],
    }
  },
  computed: {
    foodItems() {
      return this.$store.state.search.foodItems
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
  async created() {
    if (this.isNew) this.isEditing = true
    else {
      await this.fetchRecipe()
      this.recipe.items.map(async (item) => {
        const doc = await FirebaseHelper.fetchItem('foodItems', item.id)
        const foodItem = new FoodItem(doc.id, doc.data())
        this.recipeItems.push({
          amount: item.amount,
          id: item.id,
          name: foodItem.name,
          unit: item.unit,
          units: foodItem.units,
        })
      })
    }
  },
  methods: {
    addRecipeItem(foodItem) {
      const unit = foodItem.unitDefault || foodItem.units[0]
      const amount = unit === 'g' ? 100 : 1
      this.recipeItems.push({
        amount,
        id: foodItem.id,
        name: foodItem.name,
        unit,
        units: foodItem.units,
      })
    },

    openSearchForm() {
      this.isSearchFormOpen = true
    },

    async fetchRecipe() {
      try {
        const doc = await FirebaseHelper.fetchItem('recipes', this.id)
        const data = doc.data()
        this.recipe = new Recipe(data)
      } catch (_) {}
    },

    async submit() {
      if (!this.recipe) return
      const items = this.recipeItems.map((item) => {
        return {
          id: item.id,
          amount: item.amount,
          unit: item.unit,
        }
      })
      const recipe = {
        ...this.recipe,
        items,
      }
      if (this.isNew) {
        this.create(recipe)
      } else {
        this.update(recipe)
      }
    },

    async create(recipe) {
      try {
        const doc = await FirebaseHelper.create('recipes', recipe)
        this.$router.push({
          name: 'recipes-id',
          params: { id: doc.id },
        })
      } catch (_) {}
    },

    async update(recipe) {
      try {
        FirebaseHelper.update('recipes', this.id, recipe)
        this.fetchRecipe()
        this.isEditing = false
      } catch (e) {
        console.log(e)
      }
    },

    onCancel() {
      this.fetchRecipe()
      this.isEditing = false
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
