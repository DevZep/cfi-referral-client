import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState } from '@/store'
import { Auth } from 'aws-amplify'

export interface AccountState {
  newUserEmail: string;
  statusMessage: string;
}

const state: AccountState = {
  newUserEmail: '',
  statusMessage: ''
}

const mutations: MutationTree<AccountState> = {
  setNewUserEmail (state, newUserEmail) {
    state.newUserEmail = newUserEmail
  },
  setStatusMessage (state, message) {
    state.statusMessage = message
  }
}

const actions: ActionTree<AccountState, RootState> = {
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

const getters: GetterTree<AccountState, RootState> = {
  isNewUser: state => state.newUserEmail,
  statusMessage: state => state.statusMessage
}

const module: Module<AccountState, RootState> = {
  state,
  mutations,
  actions,
  getters
  // namespaced: true
}

export default module
