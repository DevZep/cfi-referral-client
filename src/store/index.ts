import Vue from 'vue'
import Vuex from 'vuex'
import { Auth } from 'aws-amplify'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: localStorage.getItem('user-token') || null,
    status: ''
  },
  mutations: {
    // Synchronous
    setUser (state, user) {
      state.user = user
    },
    authRequest (state) {
      state.status = 'loading'
    },
    authSuccess (state, token) {
      state.status = 'success'
      state.token = token
    },
    authError (state) {
      state.status = 'error'
      state.token = null
    },
    clearSession (state) {
      state.status = ''
      state.user = null
      state.token = null
    }
  },
  actions: {
    // Asynchronous
    async login ({ commit }, { username, password }) {
      commit('authRequest')
      try {
        const user = await Auth.signIn(username, password)
        const token = user.signInUserSession.accessToken.jwtToken
        commit('setUser', user.attributes)
        commit('authSuccess', token)
        localStorage.setItem('user-token', token)
      } catch (e) {
        localStorage.removeItem('user-token')
        commit('authError')
      }
    },
    async signOut ({ commit }) {
      try {
        commit('clearSession')
        localStorage.removeItem('user-token')
        await Auth.signOut()
      } catch (error) {
        // console.log('error signing out: ', error)
      }
    },
    // currentSession action handles when user refreshes the app
    async currentSession ({ commit, dispatch }) {
      commit('authRequest')
      try {
        const session = await Auth.currentSession()
        const user = await Auth.currentUserInfo()
        commit('authSuccess', session.getIdToken().getJwtToken())
        commit('setUser', user.attributes)
      } catch (e) {
        // AWS Session error so signOut!
        dispatch('signOut')
      }
    }
  },
  modules: {
  },
  getters: {
    getUser: state => state.user,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  }
})
