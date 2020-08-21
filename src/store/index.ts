import Vue from 'vue'
import Vuex, { ModuleTree } from 'vuex'
import Auth, { AuthState } from './modules/auth'
import Accounts, { AccountState } from './modules/accounts'
import Referrals, { ReferralState } from './modules/referrals'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export interface RootState {
  Auth: AuthState;
  Accounts: AccountState;
  Referrals: ReferralState;
}

const modules: ModuleTree<RootState> = {
  Auth,
  Accounts,
  Referrals
}

const store = new Vuex.Store({ modules })

export default store
