import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState } from '@/store'
import { Auth } from 'aws-amplify'

export interface AuthState {
  user: string | null;
  token: string | null;
  status: string;
  newUserEmail: string;
  statusMessage: string;
}

const state: AuthState = {
  user: null,
  token: localStorage.getItem('user-token') || null,
  status: '',
  newUserEmail: '',
  statusMessage: ''
}

const mutations: MutationTree<AuthState> = {
  setUser (state, user) {
    state.user = user
  },
  setNewUserEmail (state, newUserEmail) {
    state.newUserEmail = newUserEmail
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
  },
  setStatusMessage (state, message) {
    state.statusMessage = message
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
  },
  async signUp ({ commit, dispatch }, { email, password }) {
    try {
      commit('setNewUserEmail', email)
      const newUser = await Auth.signUp(email, password)
    } catch (e) {
      if (e.code === 'UsernameExistsException') {
        commit('setStatusMessage', 'This email already exists. Sending another code now.')
        dispatch('resendCode')
      }
    }
  },
  async resendCode ({ state }) {
    try {
      await Auth.resendSignUp(state.newUserEmail)
    } catch (e) {
      console.log('Error in resendCode: ', e)
    }
  },
  async confirmCode ({ commit, state }, code) {
    try {
      const resp = await Auth.confirmSignUp(state.newUserEmail, code)
      commit('setStatusMessage', 'Perfect! Your code was correct. Now you can login!')
    } catch (e) {
      if (e.code === 'NotAuthorizedException') {
        commit('setStatusMessage', 'You are probably already confirmed. Try logging in!')
      }
      commit('setStatusMessage', e.message)
      console.log('Error in confirmCode: ', e)
    }
  }
}

const getters: GetterTree<AuthState, RootState> = {
  getUser: state => state.user,
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  isNewUser: state => state.newUserEmail,
  statusMessage: state => state.statusMessage
}

const module: Module<AuthState, RootState> = {
  state,
  mutations,
  actions,
  getters
  // namespaced: true
}

export default module
