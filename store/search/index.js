import algoliasearch from 'algoliasearch'
import { FirebaseHelper } from '@/plugins/firebase'
import { TYPES, FoodItem } from '~/models/foodItem'
const client = algoliasearch('0VUG31LZTM', '6db46705cc09237dd2c59bba77c63254')
const index = client.initIndex('index_fooditems')

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
  setKeyword(state, params) {
    state.keyword = params.keyword
  },
  setLimit(state, params) {
    const number = Number(params.limit)
    if (!Number.isNaN(number)) state.limit = number
  },
  setTypes(state, params) {
    state.types = []
    const typeValues = TYPES.map((type) => type.value)
    params.types.forEach((type) => {
      if (typeValues.includes(type)) state.types.push(type)
    })
  },
  setFoodItems(state, params) {
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
    index
      .search(state.keyword)
      .then(({ hits }) => {
        const foodItems = hits.map(
          (foodItem) => new FoodItem(foodItem.objectID, foodItem)
        )
        commit('setFoodItems', { foodItems })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        commit('finishSearch')
      })
  },
}
