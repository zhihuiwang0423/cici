import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions' // 同步
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function CreateStore () {
  const store = new Vuex.Store({
    state: {
      count: 0,
      sum: 1,
      waiting: false
    },
    actions,
    mutations,
    getters
  })
  return store
}

