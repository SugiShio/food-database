import { DocumentData } from 'firebase/firestore'
import { FoodItem } from './foodItem'

export interface Recipe {
  [key: string]: string | FoodItem[]
  id: string
  name: string
  description: string
  items: FoodItem[]
}

export class Recipe {
  constructor(id = '', recipe?: DocumentData) {
    this.id = id
    this.name = recipe ? recipe.name : ''
    this.description = recipe ? recipe.description : ''
    this.items = recipe ? recipe.items : ''
  }
}
