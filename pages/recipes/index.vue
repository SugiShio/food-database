<template lang="pug">
.p-recipes-index
  ul
    li(v-for='recipe in recipes')
      nuxt-link(:to='{ name: "recipes-id", params: { id: recipe.id } }')
        | {{ recipe.recipe.name }}

  nuxt-link.p-recipes-index__link-add(
    v-if='isSignin',
    :to='{ name: "recipes-id", params: { id: "new" } }'
  ) +
</template>

<script>
import Vue from 'vue'
import { Recipe } from '@/models/recipe'
import { FirebaseHelper } from '@/plugins/firebase'

export default Vue.extend({
  name: 'PagesRecipes',
  data() {
    return {
      recipes: [],
    }
  },
  computed: {
    isSignin() {
      return this.$store.state.isSignin
    },
  },
  async created() {
    try {
      const querySnapshot = await FirebaseHelper.fetchIndex('recipes')
      querySnapshot.forEach((doc) => {
        this.recipes.push({ id: doc.id, recipe: new Recipe(doc.data()) })
      })
    } catch (_) {}
  },
})
</script>

<style lang="scss" scoped>
.p-recipes-index {
  padding: 10px 20px 50px;

  &__block {
    margin: 30px 0;
  }

  &__title {
    font-weight: bold;
    margin: 10px 0;
  }

  &__link-add {
    background-color: $color-main;
    border-radius: 25px;
    bottom: calc(env(safe-area-inset-bottom) + 15px);
    box-shadow: 0 0 5px rgba(darken($color-main, 40%), 0.5);
    color: #fff;
    font-size: 25px;
    left: 15px;
    line-height: 50px;
    position: fixed;
    text-align: center;
    text-decoration: none;
    width: 50px;
  }
}
</style>
