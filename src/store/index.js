import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'
import category from "./modules/category";
import getters from "./getters";
import theme from "./modules/theme";
import app from "./modules/app";
import search from "./modules/search";
const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    search
  },
  plugins: [
    createPersistedState({
      key: 'imooc-front',
      paths: ['category', 'theme', 'search']
    })
  ]
})

export default store