import { createLocalVue, shallowMount } from '@vue/test-utils'
import ReferralCounter from '@/views/ReferralCounter.vue'
import Vuex from 'vuex'
import { expect } from 'chai'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ReferralCounter.vue', () => {
  let store: any
  let wrapper: any
  const stubsList = ['router-link']

  beforeEach(() => {
    // Mock the Vuex store Referrals namespace
    store = new Vuex.Store({
      modules: {
        Referrals: {
          namespaced: true,
          state: {
            count: 0
          },
          actions: {
            fetchCount: () => (fn: Function) => fn()
          },
          getters: {
            getCount: state => state.count
          }
        }
      }
    })
  })

  describe('default state (user has not made any referrals)', () => {
    beforeEach(() => {
      wrapper = shallowMount(ReferralCounter, { localVue, store, stubs: stubsList })
    })

    it('renders with a default title', () => {
      expect(wrapper.find('#referralCounter > h1').text().trim()).to.eq('Referral Counter')
    })

    it('renders with the expected count of 0', () => {
      expect(wrapper.find('#countMessage').text().trim()).to.eq('You have created 0 referrals')
    })
  })

  describe('updated state', () => {
    it('renders with the expected count of 2', () => {
      store.state.Referrals.count = 2
      wrapper = shallowMount(ReferralCounter, { localVue, store, stubs: stubsList })
      expect(wrapper.find('#countMessage').text().trim()).to.eq('You have created 2 referrals')
    })
  })
})
