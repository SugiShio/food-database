import { FoodItem } from '../foodItem'
import { DailyFoodItem } from '../foodItem/dailyFoodItem'
const MARKS = ['morning', 'lunch', 'dinner']

export class DailyItem {
  constructor(dailyItem, timestamp) {
    this.mark = dailyItem ? dailyItem.mark : MARKS[0]
    this.time = dailyItem ? dailyItem.time : this.getTimeObject(timestamp)
    this.foodItems = dailyItem
      ? dailyItem.foodItems.map((foodItem) => {
          return new DailyFoodItem(foodItem)
        })
      : []
  }

  addFoodItem(foodItem) {
    this.foodItems.push(new DailyFoodItem(foodItem))
  }

  deleteFoodItem(index) {
    this.foodItems.splice(index, 1)
  }

  get timeText() {
    const dateObj = new Date(this.time.seconds * 1000)
    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes()
    const minutesText = `0${minutes}`.slice(-2)
    return `${hours}:${minutesText}`
  }

  getTimeObject(timestamp) {
    const datetime = timestamp ? new Date(timestamp) : new Date()
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    datetime.setHours(hours)
    datetime.setMinutes(minutes)
    const seconds = Math.floor(datetime.getTime() / 1000)
    return { seconds }
  }
}
