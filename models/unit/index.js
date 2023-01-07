export const DEFAULT_UNIT = {
  unit: 'g',
  rate: 1,
}

export class Unit {
  constructor(unit = DEFAULT_UNIT) {
    this.unit = unit.unit
    this.rate = unit.rate
  }
}
