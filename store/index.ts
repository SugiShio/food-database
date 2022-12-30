interface state {
  user: {
    uid?: string
    displayName?: string
  }
  isSignin: boolean
}
export const state = () => ({
  user: {},
  isSignin: false,
})

export const mutations = {
  setIsSignin(state: state) {
    state.isSignin = true
  },

  setUser(state: state, user: { uid: string; displayName: string }) {
    state.user = { ...user }
  },

  resetUser(state: state) {
    state.user = {}
  },
}
