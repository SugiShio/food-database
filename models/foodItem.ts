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
  nutrient: [] = []
  constructor(id: string, foodItem: DocumentData) {
    this.id = id || ''
    this.name = foodItem.name || ''
    this.description = foodItem.description || ''
    this.images = foodItem.images || []
    this.nutrients = this.setNutrients(foodItem.nutrients || [])
  }

  setNutrients(nutrients) {
    return Object.keys(NUTRIENTS).map((key) => {
      const nutrient = nutrients.find((n) => {
        return n.nutrientId === key
      })
      return nutrient ? new Nutrient(key, nutrient.value) : ''
    })
  }
}
