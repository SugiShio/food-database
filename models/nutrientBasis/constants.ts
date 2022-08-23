// todo
// 年齢によって違う
// 設定から持ってくる
// 最大値最小値

export interface NutrientBasis {
  nutrientId: string
  dietaryReferenceIntake: number
}

export const NUTRIENT_BASIS = [
  {
    nutrientId: 'calorie',
    dietaryReferenceIntake: 2050,
  },
  {
    nutrientId: 'protein',
    dietaryReferenceIntake: 50,
  },
  {
    nutrientId: 'fat',
    dietaryReferenceIntake: 56.9,
  },
  {
    nutrientId: 'carbohydrate',
    dietaryReferenceIntake: 294.7,
  },
  {
    nutrientId: 'dietaryFiber',
    dietaryReferenceIntake: 18,
  },
  {
    nutrientId: 'salt',
    dietaryReferenceIntake: 6.5,
  },
  {
    nutrientId: 'vitaminA',
    dietaryReferenceIntake: 700,
  },
  {
    nutrientId: 'vitaminB1',
    dietaryReferenceIntake: 1.1,
  },
  {
    nutrientId: 'vitaminB2',
    dietaryReferenceIntake: 1.2,
  },
  {
    nutrientId: 'niacin',
    dietaryReferenceIntake: 12,
  },
  {
    nutrientId: 'vitaminB6',
    dietaryReferenceIntake: 1.1,
  },
  {
    nutrientId: 'vitaminC',
    dietaryReferenceIntake: 100,
  },
  {
    nutrientId: 'vitaminD',
    dietaryReferenceIntake: 8.5,
  },
  {
    nutrientId: 'vitaminE',
    dietaryReferenceIntake: 5.5,
  },
  {
    nutrientId: 'folicAcid',
    dietaryReferenceIntake: 240,
  },
  {
    nutrientId: 'pantothenicAcid',
    dietaryReferenceIntake: 5,
  },
  {
    nutrientId: 'biotin',
    dietaryReferenceIntake: 0,
  },
  {
    nutrientId: 'sodium',
    dietaryReferenceIntake: 100,
  },
  {
    nutrientId: 'potassium',
    dietaryReferenceIntake: 2000,
  },
  {
    nutrientId: 'calcium',
    dietaryReferenceIntake: 650,
  },
  {
    nutrientId: 'magnesium',
    dietaryReferenceIntake: 290,
  },
  {
    nutrientId: 'phosphorous',
    dietaryReferenceIntake: 800,
  },
  {
    nutrientId: 'iron',
    dietaryReferenceIntake: 10.5,
  },
  {
    nutrientId: 'zinc',
    dietaryReferenceIntake: 8,
  },
  {
    nutrientId: 'copper',
    dietaryReferenceIntake: 0.7,
  },
  {
    nutrientId: 'manganese',
    dietaryReferenceIntake: 3.5,
  },
  {
    nutrientId: 'selenium',
    dietaryReferenceIntake: 0,
  },
  {
    nutrientId: 'chromium',
    dietaryReferenceIntake: 0,
  },
  {
    nutrientId: 'molybdenum',
    dietaryReferenceIntake: 0,
  },
  {
    nutrientId: 'iodine',
    dietaryReferenceIntake: 0,
  },
  {},
]
