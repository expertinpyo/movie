import Vue from 'vue'
import Vuex from 'vuex'
import createPersisedState from 'vuex-persistedstate'

import articles from './modules/articles'
import accounts from './modules/accounts'
import movies from './modules/movies'
import intro from './modules/intro'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { accounts, articles, movies, intro },
  plugins: [
    createPersisedState({
      paths: ["intro"],
    })
  ]
})