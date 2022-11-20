import { FoodItem } from '../foodItem'
import { DailyFoodItem } from '../foodItem/dailyFoodItem'
const MARKS = ['morning', 'lunch', 'dinner']

export interface DailyItem {
  createdAt: number
  foodItems: FoodItem[]
  mark: string
  time: { seconds: number }
}
export class DailyItem {
  constructor(dailyItem?: any) {
    this.mark = dailyItem ? dailyItem.mark : MARKS[0]
    this.time = dailyItem
      ? dailyItem.time
      : { seconds: new Date().getTime() / 1000 }
    this.foodItems = dailyItem
      ? dailyItem.foodItems.map((foodItem: DailyFoodItem) => {
          return new DailyFoodItem(foodItem)
        })
      : []
  }

  addFoodItem(foodItem: FoodItem) {
    this.foodItems.push(new DailyFoodItem(foodItem))
  }

  get timeText() {
    const dateObj = new Date(this.time.seconds * 1000)
    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes()
    const minutesText = `0${minutes}`.slice(-2)
    return `${hours}:${minutesText}`
  }
}
