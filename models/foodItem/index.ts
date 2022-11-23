import { FoodItemNutrients } from '@/models/foodItem/nutrients'
import { RadioOption } from '@/models/radioOption'

export interface FoodItem {
  [key: string]: any
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
    this.nutrients = foodItem
      ? new FoodItemNutrients(foodItem.nutrients)
      : new FoodItemNutrients()
    this.provider = foodItem ? foodItem.provider : ''
    this.type = foodItem ? foodItem.type : ''
    this.units = foodItem ? foodItem.units : []
  }

  getNutrientValue(params: {
    nutrientId: string
    amount: number
    unit: string
  }) {
    const unitInfo = this.units.find((u) => u.unit === params.unit)
    if (!unitInfo) return
    const value = this.nutrients[params.nutrientId]

    return typeof value === 'number'
      ? (params.amount * value * unitInfo.rate) / 100
      : null
  }

  get typeLabel() {
    const item = TYPES.find((type) => type.value === this.type)
    return item ? item.label : ''
  }

  get nameWithProvider() {
    return this.provider ? `${this.name}(${this.provider})` : this.name
  }
}
