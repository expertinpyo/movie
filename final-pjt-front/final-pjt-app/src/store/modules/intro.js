import router from '@/router'

export default {
  state: {
    isStart: '',
  },
  getters: {
    isStart: state => !!state.isStart,
  },
  mutations: {
    SET_START: (state, isStart) => state.isStart = isStart,
  },
  actions: {
    GoGo({ commit }, isStart ) {
      isStart = true
      commit('SET_START', isStart)
      localStorage.setItem('isStart', isStart)
      router.push({ name: 'login' })
    },
    ReStart({ commit, dispatch }, isStart ) {
      isStart = false
      commit('SET_START', isStart)
      dispatch('removeToken')
    },
  }

}