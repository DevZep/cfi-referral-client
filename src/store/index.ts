import Vue from 'vue'
import Vuex from 'vuex'
import { Auth } from 'aws-amplify'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
    user: null
  },
  mutations: {
    // Synchronous
    setUser (state, user) {
      state.user = user
      state.authenticated = (state.user !== null)
    }
  },
  actions: {
    // Asynchronous
    async login ({ commit }, { username, password }) {
      try {
        const user = await Auth.signIn(username, password)
        commit('setUser', user.attributes)
        console.log('User: ', user.attributes)
      } catch (e) {
        commit('setUser', null)
      }
    },
    async signOut ({ commit }) {
      try {
        await Auth.signOut()
        commit('setUser', null)
      } catch (error) {
        console.log('error signing out: ', error)
      }
    }
  },
  modules: {
  },
  getters: {
    isAuthenticated: state => state.authenticated,
    getUser: state => state.user
  }
})
