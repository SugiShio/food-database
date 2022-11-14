import { FoodItem } from '.'
export interface DailyFoodItem extends FoodItem {
  amount: number
  unit: string
}

export class DailyFoodItem extends FoodItem {
  constructor(id = '', dailyFoodItem?: any) {
    super(id, dailyFoodItem)
    this.amount = dailyFoodItem ? dailyFoodItem.amount : 100
    this.unit = dailyFoodItem ? dailyFoodItem.unit : 'g'
  }
}
