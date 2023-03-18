export const state = () => ({
  user: {},
  isSignin: false,
})

export const mutations = {
  setIsSignin(state) {
    state.isSignin = true
  },

  setUser(state, user = {}) {
    state.user = { ...user }
  },

  resetUser(state) {
    state.user = {}
  },
}

export const getters = {
  isDesktop() {
    return process.client && window.innerWidth > 600
  },
}
