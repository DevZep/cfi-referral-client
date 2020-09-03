import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState } from '@/store'
import { Auth } from 'aws-amplify'
import router from '@/router'

export interface AccountState {
  newUserEmail: string;
  statusMessage: string;
  emailCodeConfirmed: boolean;
}

const state: AccountState = {
  newUserEmail: '',
  statusMessage: '',
  emailCodeConfirmed: false
}

const mutations: MutationTree<AccountState> = {
  setNewUserEmail (state, newUserEmail) {
    state.newUserEmail = newUserEmail
  },
  setStatusMessage (state, message) {
    state.statusMessage = message
  },
  setEmailCodeConfirmed (state, confirmed) {
    state.emailCodeConfirmed = confirmed
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
      commit('setEmailCodeConfirmed', true)
      router.push('/')
    } catch (e) {
      if (e.code === 'NotAuthorizedException') {
        commit('setEmailCodeConfirmed', true)
        router.push('/')
      }
      commit('setStatusMessage', e.message)
      console.log('Error in confirmCode: ', e)
    }
  }
}

const getters: GetterTree<AccountState, RootState> = {
  isNewUser: state => state.newUserEmail,
  statusMessage: state => state.statusMessage,
  emailCodeConfirmed: state => state.emailCodeConfirmed
}

const module: Module<AccountState, RootState> = {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}

export default module
