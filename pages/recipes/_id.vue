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
      .recipes-id__label(:class='{ isEditing }')
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
    input(v-model='searchWord')
    button(type='button', @click='searchItem') search

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

export default Vue.extend({
  name: 'PagesrecipesId',
  data(): {
    isEditing: boolean
    recipe: Recipe | null
    searchWord: string
    postItem: {}
  } {
    return {
      isEditing: false,
      recipe: null,
      searchWord: '',
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
  },
  created() {
    this.fetchRecipe()
  },
  methods: {
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
        console.log(doc, this.postItem)

        this.$router.push({
          name: 'recipes-id',
          params: { id: doc.id },
        })
      } catch (_) {}
    },
    searchItem() {
      console.log(this.searchWord)
    },
    async update() {
      if (!this.recipe) return
      try {
        FirebaseHelper.update('recipes', this.recipe?.id, this.postItem)
        console.log('Item successfully updated! 🍅')
        this.fetchRecipe()
        this.isEditing = false
      } catch (_) {}
    },
    onCancel() {
      this.isEditing = false
      this.fetchRecipe()
    },
    onInput(value: string, key: string) {
      if (!this.recipe) return
      this.$set(this.postItem, key, value)
      this.recipe[key] = value
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
    display: flex;
    align-items: center;
    flex-grow: 1;
    overflow: hidden;
    white-space: pre-wrap;
  }

  &__item-number {
    width: 100px;
    flex-shrink: 0;
  }
  &__item-bar {
    flex-grow: 1;
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
    margin: 0 30px;
  }
}
</style>
