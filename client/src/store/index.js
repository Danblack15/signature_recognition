import { createStore } from 'vuex'
import Cookies from 'js-cookie'

import { Signatures } from './modules/signatures.js'

export default createStore({
  state: {
    hint: null,
    hintStatus: null
  },
  getters: {
    getHint(state) {
      return state.hint;
    },
    getHintStatus(state) {
      return state.hintStatus;
    }
  },
  mutations: {
    setHint(state, hintData) {
      state.hint = hintData[0];
      state.hintStatus = hintData[1] || false

      setTimeout(() => {
        state.hint = null;
        state.hintStatus = null;
      }, 3000);
    }
  },
  actions: {
    setNewHint({ commit }, hintData) {
      commit('setHint', hintData);
    },
    logout() {
      Cookies.remove('userName')
      window.location = '/'
    }
  },
  modules: {
    signatures: Signatures
  }
})