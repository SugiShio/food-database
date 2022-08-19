import { NUTRIENTS } from './constants'

export interface Nutrient {
  nutrientId: string
  value: number | null
}

export class Nutrient {
  constructor(nutrientId: string, value: number | null) {
    this.nutrientId = nutrientId
    this.value = value
  }

  get label() {
    return NUTRIENTS[this.nutrientId].label
  }

  get unit() {
    return NUTRIENTS[this.nutrientId].unit
  }
}
