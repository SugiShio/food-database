import { FoodItem } from '../foodItem'
import { DailyFoodItem } from '../foodItem/dailyFoodItem'

export interface DailyItem {
  createdAt: number
  foodItems: FoodItem[]
  mark: string
  time: number
}
export class DailyItem {
  constructor(dailyItem?: DailyItem) {
    this.mark = dailyItem ? dailyItem.mark : 'hoge'
    this.time = dailyItem ? dailyItem.time.seconds * 1000 : new Date().getTime()
    this.foodItems = dailyItem
      ? dailyItem.foodItems.map((foodItem) => {
          return new DailyFoodItem(foodItem.id, foodItem)
        })
      : []
  }

  get timeText() {
    const dateObj = new Date(this.time)
    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes()
    return `${hours}:${minutes}`
  }
}
