import { DocumentData } from 'firebase/firestore'
import { FoodItem } from './foodItem'

export interface RecipeItem {
  id: string
  amount: number
}
export interface Recipe {
  [key: string]:
    | string
    | RecipeItem[]
    | ((item: FoodItem, amount: number) => void)
  id: string
  name: string
  description: string
  items: RecipeItem[]
}

export class Recipe {
  constructor(id = '', recipe?: DocumentData) {
    this.id = id
    this.name = recipe ? recipe.name : ''
    this.description = recipe ? recipe.description : ''
    this.items = recipe ? recipe.items : []
  }

  addItem(item: FoodItem, amount: number) {
    this.items.push({ id: item.id, amount })
  }
}
