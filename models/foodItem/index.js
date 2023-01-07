import { FoodItemNutrients } from '~/models/foodItem/nutrients'

export const TYPES = [
  { value: 'general', label: '一般食品' },
  { value: 'commercial', label: '市販品' },
  { value: 'menu', label: '外食メニュー' },
]

export class FoodItem {
  constructor(id = '', foodItem) {
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
    this.url = foodItem ? foodItem.url : ''
    this.units = foodItem ? foodItem.units || [{ unit: 'g', rate: 1 }] : []
  }

  addUnit() {
    this.units.push({ unit: '', rate: 1 })
  }

  getNutrientValue(params) {
    // if (!this.units) return
    const unitInfo = this.units.find((u) => u.unit === params.unit)
    if (!unitInfo) return
    const value = this.nutrients[params.nutrientId]

    return typeof value === 'number'
      ? (params.amount * value * unitInfo.rate) / 100
      : null
  }

  setUnit(units) {
    this.units = []
    units.forEach((unit) => {
      this.units.push(unit)
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
