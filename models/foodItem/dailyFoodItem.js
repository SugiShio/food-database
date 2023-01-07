import { FoodItem } from '.'

export class DailyFoodItem extends FoodItem {
  constructor(dailyFoodItem) {
    super(dailyFoodItem.id, dailyFoodItem)
    this.amount = dailyFoodItem ? dailyFoodItem.amount || 100 : 100
    this.unit = dailyFoodItem ? dailyFoodItem.unit || 'g' : 'g'
  }

  getNutrientValue(params) {
    return super.getNutrientValue({
      nutrientId: params.nutrientId,
      amount: this.amount,
      unit: this.unit,
    })
  }

  setAmountAndUnit(value) {
    this.amount = value.amount
    this.unit = value.unit
  }
}
