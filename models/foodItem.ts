import { DocumentData } from 'firebase/firestore'
import { Nutrient } from '@/models/nutrient'
import { NUTRIENTS } from '@/models/nutrient/constants'
import { RadioOption } from '@/models/radioOption'

export interface FoodItem {
  [key: string]: string | string[] | Nutrient[]
  id: string
  name: string
  description: string
  images: string[]
  keywords: string[]
  nutrients: Nutrient[]
  type: string
}

export const TYPES: RadioOption[] = [
  { value: 'general', label: '一般食品' },
  { value: 'commercial', label: '市販品' },
  { value: 'menu', label: '外食メニュー' },
]

export class FoodItem {
  constructor(id = '', foodItem?: DocumentData) {
    this.id = id || ''
    this.name = foodItem ? foodItem.name : ''
    this.description = foodItem ? foodItem.description : ''
    this.keywords = foodItem ? foodItem.keywords : []
    this.images = foodItem ? foodItem.images : []
    this.nutrients = this.setNutrients(foodItem ? foodItem.nutrients : [])
    this.type = foodItem ? foodItem.type : ''
  }

  setNutrients(nutrients: Nutrient[]): Nutrient[] {
    return Object.keys(NUTRIENTS).map((key) => {
      const nutrient = nutrients.find((n: Nutrient) => {
        return n.nutrientId === key
      })
      return new Nutrient(key, nutrient ? nutrient.value : 0)
    })
  }

  get typeLabel() {
    const item = TYPES.find((type) => type.value === this.type)
    return item ? item.label : ''
  }
}
