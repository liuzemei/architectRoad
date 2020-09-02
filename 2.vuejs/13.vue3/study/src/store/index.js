import { createStore } from 'vuex'
import * as types from './action-types'
import * as api from '../api'
export default createStore({
  state: {
    planList: []
  },
  getters: {
    allTimes() {
      return 0
    }
  },
  mutations: {
    [types.ADD_PLAN](state, payload) {
      state.planList = [...state.planList, payload]
    },
    [types.DELETE_PLAN](state, id) {
      state.planList = state.planList.filter(item => item._id !== id)
    },
    [types.SET_PLAN_LIST](state, payload) {
      state.planList = payload
    },
  },
  actions: {
    async [types.ADD_PLAN]({ commit }, payload) {
      let plan = await api.addPlan(payload)
      commit(types.ADD_PLAN, plan)
    },
    async [types.DELETE_PLAN]({ commit }, payload) {
      let plan = await api.deletePlan(payload)
      commit(types.DELETE_PLAN, plan)
    },
    async [types.SET_PLAN_LIST]({ commit }) {
      let plan = await api.getPlanList()
      commit(types.DELETE_PLAN, plan)
    },
  },
  modules: {
  }
})
