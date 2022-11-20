import { DailyItem } from '../dailyItem'

export interface Daily {
  [key: string]:
    | string
    | number
    | { seconds: number }
    | DailyItem[]
    | (() => void)
  id: string
  date: { seconds: number }
  items: DailyItem[]
}

export class Daily {
  constructor(id: string, daily?: any) {
    this.id = id
    this.date = daily ? daily.date : { seconds: new Date().getTime() / 1000 }
    this.items = daily
      ? daily.items.map((item: DailyItem) => {
          return new DailyItem(item)
        })
      : []
  }

  addItem() {
    this.items.unshift(new DailyItem())
  }

  get dateText() {
    const dateObj = new Date(this.date.seconds * 1000)
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const date = dateObj.getDate()
    return `${year}.${month}.${date}`
  }
}
