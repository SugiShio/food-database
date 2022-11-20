import { Nutrient } from '@/models/nutrient'
import { NUTRIENTS } from '@/models/nutrient/constants'
import { FoodItemNutrients } from '@/models/foodItem/nutrients'
import { RadioOption } from '@/models/radioOption'

export interface FoodItem {
  [key: string]:
    | string
    | number
    | string[]
    | FoodItemNutrients
    | { unit: string; rate: number }[]
    | ((nutrients: FoodItemNutrients) => Nutrient[])
  id: string
  name: string
  description: string
  images: string[]
  keywords: string[]
  nutrients: FoodItemNutrients
  provider: string
  type: string
  units: { unit: string; rate: number }[]
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
    this.nutrients = foodItem ? foodItem.nutrients : new FoodItemNutrients()
    this.provider = foodItem ? foodItem.provider : ''
    this.type = foodItem ? foodItem.type : ''
    this.units = foodItem ? foodItem.units : []
  }

  getNutrientValue({ nutrientId, amount, unit }) {
    const unitInfo = this.units.find((u) => u.unit === unit)
    if (!unitInfo) return
    const value = this.nutrients[nutrientId]
    return value === null ? null : (amount * value * unitInfo.rate) / 100
  }

  get typeLabel() {
    const item = TYPES.find((type) => type.value === this.type)
    return item ? item.label : ''
  }

  get nameWithProvider() {
    return this.provider ? `${this.name}(${this.provider})` : this.name
  }
}
