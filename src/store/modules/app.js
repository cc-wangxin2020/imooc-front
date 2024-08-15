import { ALL_CATEGORY_ITEM } from '@/constants'
export default {
  namespaced: true,
  state: () => ({
    currentCategory: ALL_CATEGORY_ITEM,
    searchText: ''
  }),
  mutations: {
    setCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText
    }
  },
  actions: {

  }
}