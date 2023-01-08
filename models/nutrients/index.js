import { NUTRIENTS } from '~/constants/nutrients'

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
}
