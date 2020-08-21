import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState } from '@/store'
import { API } from 'aws-amplify'
import { s3Upload } from '../../aws/s3Upload'
import router from '@/router'

export interface ReferralState {
  referral: {
    name: string;
    phone: string;
  };
  count: number;
}

const state: ReferralState = {
  referral: {
    name: 'DADOU',
    phone: '+855123123'
  },
  count: 0
}

const mutations: MutationTree<ReferralState> = {
  UPDATE_COUNT (state, count) {
    state.count = count
  },
  SET_REFERRAL (state, referral) {
    state.referral = referral
  }
}

const actions: ActionTree<ReferralState, RootState> = {
  async fetchReferral ({ commit }, { referralId }) {
    try {
      const res = await API.get('referrals', `/referrals/${referralId}`, {})
      console.log('REFERRAL', res)
      commit('SET_REFERRAL', res)
    } catch (e) {
      console.error('Error fetching referral: ', e)
    }
  },
  async fetchCount ({ commit }) {
    try {
      const res = await API.get('count', '/count', {})
      commit('UPDATE_COUNT', res.Count)
    } catch (e) {
      console.error('Error fetching count: ', e)
    }
  },
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
      console.error('Error in SubmitReferral: ', e)
    }
  }
}

const getters: GetterTree<ReferralState, RootState> = {
  getCount: state => state.count,
  getReferral: state => state.referral
}

const module: Module<ReferralState, RootState> = {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}

export default module
