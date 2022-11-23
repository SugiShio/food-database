import { WhereFilterOp } from '@firebase/firestore'
import { FirebaseHelper } from '@/plugins/firebase'
import { TYPES, FoodItem } from '~/models/foodItem'

export const state = () => ({
  foodItems: [],
  isSearching: false,
  keyword: '',
  limit: 10,
  startSearch: false,
  types: [],
  orderBy: 'name',
})

export const mutations = {
  finishSearch(state) {
    state.isSearching = false
  },
  setKeyword(state: state, params: { keyword: string }) {
    state.keyword = params.keyword
  },
  setLimit(state: state, params: { limit: number }) {
    const number = Number(params.limit)
    if (!Number.isNaN(number)) state.limit = number
  },
  setTypes(state: state, params: { types: string[] }) {
    state.types = []
    const typeValues = TYPES.map((type) => type.value)
    params.types.forEach((type) => {
      if (typeValues.includes(type)) state.types.push(type)
    })
  },
  setFoodItems(state: state, params: { foodItems: FoodItem[] }) {
    params.foodItems.forEach((foodItem) => {
      state.foodItems.push(new FoodItem(foodItem.id, foodItem))
    })
  },
  startSearch(state) {
    state.isSearching = true
  },
  resetFoodItems(state) {
    state.foodItems = []
  },
}

export const actions = {
  async search({ commit, state }) {
    commit('startSearch')
    const wheres = []
    if (state.keyword)
      wheres.push({
        fieldPath: 'keywords',
        optStr: 'array-contains' as WhereFilterOp,
        value: state.keyword,
      })
    if (state.types.length)
      wheres.push({
        fieldPath: 'type',
        optStr: 'in' as WhereFilterOp,
        value: state.types,
      })

    const query = {
      wheres,
      ob: state.orderBy,
      l: state.limit,
    }
    if (state.foodItems.length) {
      query.sa = state.foodItems[state.foodItems.length - 1].name
    }
    try {
      const querySnapshot = await FirebaseHelper.search('foodItems', query)
      const foodItems: FoodItem[] = []
      querySnapshot.forEach((doc) => {
        foodItems.push(new FoodItem(doc.id, doc.data()))
      })
      commit('setFoodItems', { foodItems })
    } catch (e) {
      console.error(e)
    } finally {
      commit('finishSearch')
    }
  },
}
