import { DocumentData } from 'firebase/firestore'

export interface FoodItem {
  id: string
  name: string
}

export class FoodItem {
  constructor(id: string, foodItem: DocumentData) {
    this.id = id || ''
    this.name = foodItem.name || ''
  }
}
