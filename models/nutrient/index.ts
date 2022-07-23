import { NUTRIENTS } from './constants'

export interface Nutrient {
  nutrientId: string
  value: number
}

export class Nutrient {
  constructor(nutrientId: string, value: number) {
    this.nutrientId = nutrientId
    this.value = Number(value)
  }

  get label() {
    return NUTRIENTS[this.nutrientId].label
  }
}
