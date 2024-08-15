export default {
  categorys: (state) => state.category.categorys,
  themeType: (state) => state.theme.themeType,
  currentCategory: (state) => state.app.currentCategory,
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex((item) => {
      return item.id === getters.currentCategory.id
    })
  },
  searchText: (state) => state.app.searchText,
  history: (state) => state.search.history
}