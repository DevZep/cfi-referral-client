import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState } from '@/store'
import { API } from 'aws-amplify'
import router from '@/router'

export interface ReferralState {
  client: {};
}

const state: ReferralState = {
  client: {}
}

const mutations: MutationTree<ReferralState> = {

}

const actions: ActionTree<ReferralState, RootState> = {
  async submitReferral ({ commit }, { clientname, clientphone }) {
    console.log('Posting Referral to AWS!!', clientname)
    // Set to a loading state
    try {
      await API.post('referrals', '/referrals', {
        body: {
          name: clientname,
          phone: clientphone
        }
      })
      router.push('/referralCounter')
    } catch (e) {
      // Set to NOT loading state
      // Handle error
      console.log('Error in SubmitReferral: ', e)
    }
  }
}

const getters: GetterTree<ReferralState, RootState> = {

}

const module: Module<ReferralState, RootState> = {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}

export default module
