import { FoodItem } from '.'
export interface DailyFoodItem extends FoodItem {
  amount: number
  unit: string
  getNutrientValue(params: { nutrientId: string }): void
}

export class DailyFoodItem extends FoodItem {
  constructor(dailyFoodItem?: any) {
    super(dailyFoodItem.id, dailyFoodItem)
    this.amount = dailyFoodItem ? dailyFoodItem.amount || 100 : 100
    this.unit = dailyFoodItem ? dailyFoodItem.unit || 'g' : 'g'
  }

  getNutrientValue(params: { nutrientId: string }) {
    return super.getNutrientValue({
      nutrientId: params.nutrientId,
      amount: this.amount,
      unit: this.unit,
    })
  }

  setAmountAndUnit(value: { amount: 100; unit: 'g' }) {
    this.amount = value.amount
    this.unit = value.unit
  }
}
