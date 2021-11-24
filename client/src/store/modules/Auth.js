import socially from "../../api/socially";
import router from '../../router/index';

const state = {
  user: null,
  errMsg: ""
};

const getters = {
  getUser: () => state.user,
  getErrMsg: () => state.errMsg
};

const actions = {
  async loginUser({ commit }, loginInfo) {
    try {
      const res = await socially.post("/user/signin", loginInfo);
      commit("setUser", res.data);
    } catch (error) {

      commit("setErrMsg", error.response.data.msg);
    }
  },
  async registerUser({ commit }, registerInfo) {
    try {
      const res = await socially.post("/user/signup", registerInfo);
      commit("setUser", res.data);
    } catch (error) {
      commit("setErrMsg", error.response.data.msg);
    }
  },
};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
    state.errMsg = "";
    router.push("/")
  },
  setErrMsg: (state, errmsg) => {
    state.errMsg = errmsg;
    state.user = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
