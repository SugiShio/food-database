<template lang="pug">
div
  nuxt-link(:to='{ name: "recipes-id", params: { id: "new" } }') New

  ul
    li(v-for='recipe in recipes')
      nuxt-link(:to='{ name: "recipes-id", params: { id: recipe.id } }')
        | {{ recipe.name }}
</template>

<script lang="ts">
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
  async created() {
    try {
      const querySnapshot = await FirebaseHelper.fetchIndex('recipes')
      querySnapshot.forEach((doc) => {
        this.recipes.push(new Recipe(doc.id, doc.data()))
      })
    } catch (_) {}
  },
})
</script>
