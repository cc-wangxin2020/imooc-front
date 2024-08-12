import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'
import category from "./modules/category";
import getters from "./getters";
import theme from "./modules/theme";
const store = createStore({
  getters,
  modules: {
    category,
    theme
  },
  plugins: [
    createPersistedState({
      key: 'imooc-front',
      paths: ['category', 'theme']
    })
  ]
})

export default store