import { NUTRIENTS } from '~/constants/nutrients'

export interface FoodItemNutrients {
  [key: string]: number | null | ((nutrientId: string) => string)

  calorie: number | null
  protein: number | null
  fat: number | null
  carbohydrate: number | null
  sugariness: number | null
  dietaryFiber: number | null
  salt: number | null
  vitaminA: number | null
  vitaminB1: number | null
  vitaminB2: number | null
  niacin: number | null
  vitaminB6: number | null
  vitaminC: number | null
  vitaminD: number | null
  vitaminE: number | null
  folicAcid: number | null
  pantothenicAcid: number | null
  biotin: number | null
  sodium: number | null
  potassium: number | null
  calcium: number | null
  magnesium: number | null
  phosphorous: number | null
  iron: number | null
  zinc: number | null
  copper: number | null
  manganese: number | null
  selenium: number | null
  chromium: number | null
  molybdenum: number | null
  iodine: number | null
}

export class FoodItemNutrients {
  constructor(nutrients?: FoodItemNutrients) {
    Object.keys(NUTRIENTS).forEach((key: string) => {
      this[key] = nutrients ? nutrients[key] : null
    })
  }

  getLabel(nutrientId: string) {
    return NUTRIENTS[nutrientId].label
  }

  getUnit(nutrientId: string) {
    return NUTRIENTS[nutrientId].unit
  }
}
