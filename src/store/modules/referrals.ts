import { Module, ActionTree, MutationTree, GetterTree } from 'vuex'
import { RootState } from '@/store'
import { API } from 'aws-amplify'
import { s3Upload } from '../../aws/s3Upload'
import { onError } from '../../libs/errorLib'
import navigate from '../../libs/navigate'

export interface ReferralState {
  referral: {
    name: string;
    phone: string;
  };
  count: number;
}

const state: ReferralState = {
  referral: {
    name: '',
    phone: ''
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
  async fetchCount ({ commit }) {
    try {
      const res = await API.get('count', '/count', {})
      if (res && res.referralCount !== undefined) commit('UPDATE_COUNT', res.referralCount)
    } catch (e) {
      console.error('Error fetching count: ', e)
      onError(e)
    }
  },
  async submitReferral ({ commit }, { clientname, clientphone, clientphoto, clientnote, clientbirth, clientgender, clientlocation, clientlat, clientlon }) {
    // Set to a loading state
    try {
      const s3key = clientphoto ? await s3Upload(clientphoto) : null
      await API.post('referrals', '/referrals', {
        body: {
          name: clientname,
          phone: clientphone,
          note: clientnote,
          dob: clientbirth,
          gender: clientgender,
          location: clientlocation,
          lat: clientlat,
          lon: clientlon,
          photo: s3key
        }
      })
      navigate('/')
    } catch (e) {
      onError(e)
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
