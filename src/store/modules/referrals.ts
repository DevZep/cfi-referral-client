import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState } from '@/store'
import { API } from 'aws-amplify'
import { s3Upload } from '../../aws/s3Upload'
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
  async submitReferral ({ commit }, { clientname, clientphone, clientphoto }) {
    // Set to a loading state
    try {
      const s3key = clientphoto ? await s3Upload(clientphoto) : null
      await API.post('referrals', '/referrals', {
        body: {
          name: clientname,
          phone: clientphone,
          photo: s3key
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
