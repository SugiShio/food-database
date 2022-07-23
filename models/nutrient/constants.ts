export interface NUTRIENTS {
  [key: string]: {
    label: string
    unit: string
  }
}

export const NUTRIENTS: NUTRIENTS = {
  calorie: { label: 'カロリー', unit: 'kcal' },
  protein: { label: 'タンパク質', unit: 'g' },
  fat: { label: '脂質', unit: 'g' },
  carbohydrate: { label: '炭水化物', unit: 'g' },
  sugariness: { label: '糖質', unit: 'g' },
  dietaryFiber: { label: '食物繊維', unit: 'g' },
  salt: { label: '食塩相当量', unit: 'g' },
  vitaminA: { label: 'ビタミンA', unit: 'μg' },
  vitaminB1: { label: 'ビタミンB1', unit: 'mg' },
  vitaminB2: { label: 'ビタミンB2', unit: 'mg' },
  niacin: { label: 'ナイアシン', unit: 'mg' },
  vitaminB6: { label: 'ビタミンB6', unit: 'mg' },
  vitaminC: { label: 'ビタミンC', unit: 'mg' },
  vitaminD: { label: 'ビタミンD', unit: 'μg' },
  vitaminE: { label: 'ビタミンE', unit: 'mg' },
  folicAcid: { label: '葉酸', unit: 'μg' },
  pantothenicAcid: { label: 'パントテン酸', unit: 'mg' },
  biotin: { label: 'ビオチン', unit: 'μg' },
  sodium: { label: 'ナトリウム', unit: 'mg' },
  potassium: { label: 'カリウム', unit: 'mg' },
  calcium: { label: 'カルシウム', unit: 'mg' },
  magnesium: { label: 'マグネシウム', unit: 'mg' },
  phosphorous: { label: 'リン', unit: 'mg' },
  iron: { label: '鉄', unit: 'mg' },
  zinc: { label: '亜鉛', unit: 'mg' },
  copper: { label: '銅', unit: 'mg' },
  manganese: { label: 'マンガン', unit: 'mg' },
  selenium: { label: 'セレン', unit: 'μg' },
  chromium: { label: 'クロム', unit: 'μg' },
  molybdenum: { label: 'モリブデン', unit: 'μg' },
  iodine: { label: 'ヨウ素', unit: 'μg' },
}
