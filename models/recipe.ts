import { FoodItem } from './foodItem'
import { NUTRIENTS } from '~/constants/nutrients'
import { FirebaseHelper } from '@/plugins/firebase'

export interface RecipeItem {
  id: string
  amount: number
  unit: string
  foodItem: FoodItem
}

export class RecipeItem {
  id = ''
  amount = 0
  unit = 'g'

  constructor(params: RecipeItem) {
    this.id = params.id
    this.unit = params.unit
    this.amount = params.amount
    this.foodItem = params.foodItem || new FoodItem(this.id)
  }

  async setFoodItem() {
    try {
      const doc = await FirebaseHelper.fetchItem('foodItems', this.id)
      if (doc.exists()) {
        this.foodItem = new FoodItem(doc.id, doc.data())
      }
    } catch (_) {}
  }

  get nutrients() {
    const result: { [key: string]: number | null } = {}
    Object.keys(NUTRIENTS).forEach((key) => {
      result[key] = this.getNutrient(key)
    })
    return result
  }

  getNutrient(nutrientId: string) {
    const nutrient = this.foodItem?.nutrients[nutrientId]
    const unit = this.foodItem.units.find((u) => u.unit === this.unit)
    return !Number.isNaN(nutrient) && unit ? nutrient * unit.rate : null
  }
}

export interface Recipe {
  id: string
  name: string
  description: string
  items: RecipeItem[]
}

export class Recipe {
  id
  name = ''
  description = ''
  items: RecipeItem[] = []

  constructor(id = '', recipe?: any) {
    this.id = id
    this.name = recipe ? recipe.name : ''
    this.description = recipe ? recipe.description : ''
    this.items = recipe
      ? recipe.items.map((item: RecipeItem) => new RecipeItem(item))
      : []
  }

  addItem(item: FoodItem, amount: number, unit = 'g') {
    this.items.push(
      new RecipeItem({
        id: item.id,
        amount,
        unit,
        foodItem: item,
        setFoodItem: RecipeItem.prototype.setFoodItem,
      })
    )
  }

  async setData() {
    await Promise.all(
      this.items.map(async (item) => {
        await item.setFoodItem()
      })
    )
  }

  get nutrients() {
    const result: { [key: string]: number[] } = {}
    Object.keys(NUTRIENTS).forEach((key) => {
      const values: (number | null)[] = []
      this.items.forEach((item) => {
        const nutrient = item.foodItem?.nutrients[key]
        values.push(!Number.isNaN(nutrient) ? nutrient : null)
      })
      result[key] = values
    })
    return result
  }

  getNutrientSum(nutrientId: string) {
    const nutrientValues = this.nutrients[nutrientId]
    return nutrientValues.reduce((p, c) => {
      return p + (c || 0)
    }, 0)
  }
}
