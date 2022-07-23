export const state = () => ({
  isSignin: false,
})

export const mutations = {
  setIsSignin(state) {
    state.isSignin = true
  },
}
