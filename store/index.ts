interface state {
  isSignin: boolean
}
export const state = () => ({
  isSignin: false,
})

export const mutations = {
  setIsSignin(state: state) {
    state.isSignin = true
  },
}
