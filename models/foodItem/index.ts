import { Nutrient } from '@/models/nutrient'
import { NUTRIENTS } from '@/models/nutrient/constants'
import { FOOD_ITEM_NUTRIENTS } from '@/models/nutrient/types'
import { RadioOption } from '@/models/radioOption'

export interface FoodItem {
  [key: string]:
    | string
    | number
    | string[]
    | Nutrient[]
    | ((nutrients: FOOD_ITEM_NUTRIENTS) => Nutrient[])
  id: string
  name: string
  description: string
  images: string[]
  keywords: string[]
  nutrients: Nutrient[]
  provider: string
  type: string
}

export const TYPES: RadioOption[] = [
  { value: 'general', label: '一般食品' },
  { value: 'commercial', label: '市販品' },
  { value: 'menu', label: '外食メニュー' },
]

export class FoodItem {
  constructor(id = '', foodItem?: any) {
    this.id = id || ''
    this.name = foodItem ? foodItem.name : ''
    this.description = foodItem ? foodItem.description : ''
    this.keywords = foodItem ? foodItem.keywords || [] : []
    this.images = foodItem ? foodItem.images : []
    this.nutrients = this.setNutrients(foodItem ? foodItem.nutrients : [])
    this.provider = foodItem ? foodItem.provider : ''
    this.type = foodItem ? foodItem.type : ''
    this.units = foodItem ? foodItem.units : []
  }

  setNutrients(nutrients: FOOD_ITEM_NUTRIENTS): Nutrient[] {
    return Object.keys(NUTRIENTS).map((key) => {
      const nutrient = Object.keys(nutrients).find((n: string) => {
        return n === key
      })
      return new Nutrient(key, nutrient ? nutrients[key] : 0)
    })
  }

  get typeLabel() {
    const item = TYPES.find((type) => type.value === this.type)
    return item ? item.label : ''
  }

  get nameWithProvider() {
    return this.provider ? `${this.name}(${this.provider})` : this.name
  }
}
