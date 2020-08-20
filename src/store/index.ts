import Vue from 'vue'
import Vuex, { ModuleTree } from 'vuex'

import Auth, { AuthState } from './modules/auth'
// import accounts from "./modules/accounts";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export interface RootState {
  Auth: AuthState;
}

const modules: ModuleTree<RootState> = {
  Auth
}

const store = new Vuex.Store({ modules })

export default store
