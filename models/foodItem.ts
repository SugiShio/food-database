import { DocumentData } from 'firebase/firestore'
import { Nutrient } from '@/models/nutrient'
import { NUTRIENTS } from '@/models/nutrient/constants'

export interface FoodItem {
  id: string
  name: string
  description: string
  images: string[]
  nutrients: Nutrient[]
}

export class FoodItem {
  constructor(id = '', foodItem?: DocumentData) {
    this.id = id || ''
    this.name = foodItem ? foodItem.name : ''
    this.description = foodItem ? foodItem.description : ''
    this.images = foodItem ? foodItem.images : []
    this.nutrients = this.setNutrients(foodItem ? foodItem.nutrients : [])
  }

  setNutrients(nutrients: Nutrient[]): Nutrient[] {
    return Object.keys(NUTRIENTS).map((key) => {
      const nutrient = nutrients.find((n: Nutrient) => {
        return n.nutrientId === key
      })
      return new Nutrient(key, nutrient ? nutrient.value : 0)
    })
  }
}
