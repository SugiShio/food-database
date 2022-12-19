import { DailyItem } from '../dailyItem'

export interface Daily {
  [key: string]: any
  id: string
  dateString: string
  items: DailyItem[]
}

export class Daily {
  constructor(dateString: string, daily?: any) {
    this.dateString = dateString
    this.description = 'test description'
    this.items =
      daily && daily.items
        ? daily.items.map((item: DailyItem) => {
            return new DailyItem(item)
          })
        : []
    this.createdAt = daily ? daily.createdAt : null
  }

  addItem() {
    this.items.unshift(new DailyItem())
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
}
