export default {
  namespaced: true,
  state: () => ({
    history: []
  }),
  mutations: {
    addHistory(state, newHistory) {
      const isFindIndex = state.history.findIndex((item) => item === newHistory)
      if (isFindIndex !== -1) {
        state.history.splice(isFindIndex, 1)
      }
      state.history.unshift(newHistory)
    },
    deleteHistory(state, index) {
      state.history.splice(index, 1)
    },
    clearHistory(state) {
      state.history = []
    }
  },
  actions: {

  }
}