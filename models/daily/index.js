import { DailyItem } from '../dailyItem'

export class Daily {
  constructor(dateString, daily) {
    this.dateString = dateString
    this.description = 'test description'
    this.items =
      daily && daily.items
        ? daily.items.map((item) => {
            return new DailyItem(item)
          })
        : []
    this.createdAt = daily ? daily.createdAt : null
  }

  addItem(dailyItem) {
    this.items.unshift(dailyItem)
    this.sortItems()
  }

  updateItem(index, dailyItem) {
    this.items.splice(index, 1, dailyItem)
    this.sortItems()
  }

  sortItems() {
    return this.items.sort((a, b) => {
      return a.time.seconds < b.time.seconds ? -1 : 1
    })
  }

  get year() {
    return parseInt(this.dateString.slice(0, 4))
  }

  get month() {
    return parseInt(this.dateString.slice(4, 6))
  }

  get date() {
    return parseInt(this.dateString.slice(6, 8))
  }

  get timestamp() {
    return new Date(this.year, this.month - 1, this.date).getTime()
  }
}
