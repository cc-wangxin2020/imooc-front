import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'
import category from "./modules/category";
import getters from "./getters";
import theme from "./modules/theme";
import app from "./modules/app";
import user from "./modules/user";
import search from "./modules/search";
const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    search,
    user
  },
  plugins: [
    createPersistedState({
      key: 'imooc-front',
      paths: ['category', 'theme', 'search', 'user']
    })
  ]
})

export default store