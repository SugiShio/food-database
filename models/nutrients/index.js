import { NUTRIENTS } from '~/constants/nutrients'

const sum = (array) => {
  return array.reduce((p, c) => {
    return p + c
  }, 0)
}

export const getNutrientSum = (nutrients, nutrientId) => {
  if (!Object.keys(NUTRIENTS).includes(nutrientId))
    throw new Error(`'${nutrientId}' is not valid nutrient ID `)
  const nutrientValues = nutrients[nutrientId]
  if (!Array.isArray(nutrientValues)) {
    return nutrientValues
  }
  return nutrientValues.reduce((previousValue, currentValue) => {
    return Number(previousValue) + (currentValue || 0)
  }, 0)
}

export const getNutrientValues = (items) => {
  const result = {}
  Object.keys(NUTRIENTS).forEach((nutrientId) => {
    result[nutrientId] = []

    items.forEach((item) => {
      const values = item.nutrients[nutrientId]
      result[nutrientId].push(Array.isArray(values) ? sum(values) : values)
    })
  })
  return result
}

export const getNutrientSums = (nutrients) => {
  const result = {}
  Object.keys(NUTRIENTS).forEach((nutrientId) => {
    result[nutrientId] = getNutrientSum(nutrients, nutrientId)
  })
  return result
}
export class Nutrients {
  constructor(nutrients) {
    Object.keys(NUTRIENTS).forEach((key) => {
      this[key] = nutrients ? nutrients[key] : null
    })
  }

  getLabel(nutrientId) {
    return NUTRIENTS[nutrientId].label
  }

  getUnit(nutrientId) {
    return NUTRIENTS[nutrientId].unit
  }

  getNutrientSum(nutrientId) {
    return getNutrientSum(this, nutrientId)
  }

  get nutrientSums() {
    return getNutrientSums(this)
  }
}
