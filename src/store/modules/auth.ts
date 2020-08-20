import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState } from '@/store'
import { Auth } from 'aws-amplify'

export interface AuthState {
  user: string | null;
  token: string | null;
  status: string;
}

const state: AuthState = {
  user: null,
  token: localStorage.getItem('user-token') || null,
  status: ''
}

const mutations: MutationTree<AuthState> = {
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
}

const actions: ActionTree<AuthState, RootState> = {
  async login ({ commit }, { email, password }) {
    commit('authRequest')
    try {
      const user = await Auth.signIn(email, password)
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
}

const getters: GetterTree<AuthState, RootState> = {
  getUser: state => state.user,
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}

const module: Module<AuthState, RootState> = {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}

export default module
