import * as types from "./action-types";
import { getBannerList } from "@/api/public";

export default {
  state: {
    // 轮播图数据
    bannerList: [],
    ajaxTokens: []
  },
  mutations: {
    // mutation 将状态放到 bannerList 中
    async [types.SET_BANNER_LIST](state, payload) {
      state.bannerList = payload;
    },
    async [types.SET_REQUEST_TOKEN](state, payload) {
      if (payload === 'clear') state.ajaxTokens = []
      else state.ajaxTokens = [...state.ajaxTokens, payload]
    }
  },
  actions: {
    // 调用获取轮播图接口 提交到 mutation 中
    // [types.SET_BANNER_LIST]
    async [types.SET_BANNER_LIST]({ commit }) {
      let bannerList = await getBannerList();
      commit(types.SET_BANNER_LIST, bannerList);
    },
  },
};
