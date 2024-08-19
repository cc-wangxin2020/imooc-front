import { isMobileTerminal } from '@/utils/flexible'
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
  history: (state) => state.search.history,
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  routerType: (state) => {
    if (!isMobileTerminal.value) {
      return 'none'
    }
    return state.app.routerType
  }
}