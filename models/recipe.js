import { FoodItem } from './foodItem'
import { NUTRIENTS } from '~/constants/nutrients'
import { FirebaseHelper } from '@/plugins/firebase'

export class RecipeItem {
  id = ''
  amount = 0
  unit = 'g'

  constructor(params) {
    this.id = params ? params.id : ''
    this.unit = params ? params.unit : ''
    this.amount = params ? params.amount : 0
    this.foodItem = params
      ? params.foodItem || new FoodItem(this.id)
      : new FoodItem()
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
    const result = {}
    Object.keys(NUTRIENTS).forEach((key) => {
      result[key] = this.getNutrient(key)
    })
    return result
  }

  getNutrient(nutrientId) {
    const nutrient = this.foodItem.nutrients[nutrientId]
    if (this.foodItem.units) {
      const unit = this.foodItem.units.find((u) => u.unit === this.unit)
      return typeof nutrient === 'number' && unit ? nutrient * unit.rate : null
    } else {
      return typeof nutrient === 'number' ? nutrient : null
    }
  }
}

export class Recipe {
  id
  name = ''
  description = ''
  items = []

  constructor(id = '', recipe) {
    this.id = id
    this.name = recipe ? recipe.name : ''
    this.description = recipe ? recipe.description : ''
    this.items = recipe ? recipe.items.map((item) => new RecipeItem(item)) : []
  }

  addItem(item, amount, unit = 'g') {
    this.items.push(
      new RecipeItem({
        id: item.id,
        amount,
        unit,
        foodItem: item,
        setFoodItem: RecipeItem.prototype.setFoodItem,
        nutrients: RecipeItem.prototype.nutrients,
        getNutrient: RecipeItem.prototype.getNutrient,
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
    const result = {}
    Object.keys(NUTRIENTS).forEach((key) => {
      const values = []
      this.items.forEach((item) => {
        const nutrient = item.foodItem.nutrients[key]
        values.push(typeof nutrient === 'number' ? nutrient : null)
      })
      result[key] = values
    })
    return result
  }

  getNutrientSum(nutrientId) {
    const nutrientValues = this.nutrients[nutrientId]
    return nutrientValues.reduce((p, c) => {
      return typeof p === 'number' && typeof c === 'number' ? p + c : null
    }, 0)
  }
}
