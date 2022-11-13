import { DailyItem } from '../dailyItem'

export interface Daily {
  [key: string]: string | number | DailyItem[]
  id: string
  dateTimestump: number
  items: DailyItem[]
}

export class Daily {
  constructor(id: string, daily?: unknown) {
    this.id = id
    this.dateTimestump = daily
      ? daily.date.seconds * 1000
      : new Date().getTime()
    this.items = daily
      ? daily.items.map((item) => {
          return new DailyItem(item)
        })
      : []
  }

  get dateText() {
    const dateObj = new Date(this.dateTimestump)
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const date = dateObj.getDate()
    return `${year}.${month}.${date}`
  }
}
