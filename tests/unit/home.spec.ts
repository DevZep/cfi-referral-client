/* eslint-disable no-unused-expressions */
import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import Vuex from 'vuex'
import Loading from '@/components/Loading.vue'
import { expect } from 'chai'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('Loading', Loading)

describe('Home.vue', () => {
  let store: any
  let wrapper: any
  const stubsList = ['v-spacer', 'v-btn', 'router-link']

  beforeEach(() => {
    // Mock the Vuex store Auth namespace
    store = new Vuex.Store({
      modules: {
        Auth: {
          namespaced: true,
          state: {
            user: null,
            token: null,
            status: ''
          },
          getters: {
            getUser: state => state.user,
            isAuthenticated: state => !!state.token,
            authStatus: state => state.status
          }
        }
      }
    })
  })

  describe('when not logged in', () => {
    it('renders the login component', () => {
      // when user is not logged in the token is set to null
      store.state.Auth.token = null
      // need to call mount here since we are testing for the presense child component
      wrapper = mount(Home, { localVue, store, stubs: stubsList })
      expect(wrapper.find('#login > h3').text().trim()).to.eq('Login')
    })
  })

  describe('when the app status is loading', () => {
    it('renders the loading spinner', () => {
      // when app is loading the status string is set to 'loading'
      store.state.Auth.status = 'loading'
      wrapper = mount(Home, { localVue, store, stubs: stubsList })
      expect(wrapper.find('#loading').text()).not.to.be.null
    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      // when the user is logged in there should be a jwt token set
      store.state.Auth.token = 'a-value-jwt-token'
      // the user email attribute should also me set to a known email (see below)
    })

    it('renders a welcome message with the users email address', () => {
      store.state.Auth.user = { email: 'atestemail@testing.com' }
      wrapper = shallowMount(Home, { localVue, store, stubs: stubsList })
      expect(wrapper.find('#welcomeMessage').text().trim()).to.eq('Welcome atestemail@testing.com')
    })

    it('updates the email address based on the logged in user', () => {
      store.state.Auth.user = { email: 'somethingelse@email.com' }
      wrapper = shallowMount(Home, { localVue, store, stubs: stubsList })
      expect(wrapper.find('#welcomeMessage').text().trim()).to.eq('Welcome somethingelse@email.com')
    })
  })
})
