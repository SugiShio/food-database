import { FoodItem } from './foodItem'
import { NUTRIENTS } from '~/constants/nutrients'
import { FirebaseHelper } from '@/plugins/firebase'

export class RecipeItem {
  id = ''
  amount = 0
  unit = 'g'

  constructor(recipeItem) {
    this.id = recipeItem ? recipeItem.id : ''
    this.unit = recipeItem ? recipeItem.unit : ''
    this.amount = recipeItem ? recipeItem.amount : 0
  }
}

export class Recipe {
  name = ''
  description = ''
  items = []

  constructor(recipe) {
    this.name = recipe ? recipe.name : ''
    this.description = recipe ? recipe.description : ''
    this.items = recipe ? recipe.items.map((item) => new RecipeItem(item)) : []
  }
}
