import socially from "../../api/socially";
import router from '../../router/index';

const state = {
  authflow: false,
  user: null,
  errMsg: "",
  jwt: ""
};

const getters = {
  getAuthflow: () => state.authflow,
  getUser: () => state.user,
  getErrMsg: () => state.errMsg,
  getJWT: () => state.jwt
};

const actions = {
  async loginUser({ commit }, loginInfo) {
    try {
      const res = await socially.post("/user/signin", loginInfo);
      commit("setUser", res.data);
    } catch (error) {
      console.log(error.response.data.errors.msg);
      commit("setErrMsg", error.response.data.errors.msg);
    }
  },
  async registerUser({ commit }, registerInfo) {
    try {
      await socially.post("/user/signup", registerInfo);
      commit("redirectRegister");
    } catch (error) {
      console.log(error.response.data.errors.msg);
      commit("setErrMsg", error.response.data.errors.msg);
    }
  },
  changeAuthflowFalse({commit}) {
    commit("setAuthflowFalse");
  }
};

const mutations = {
  setUser: (state, data) => {
    state.user = data.user;
    state.errMsg = "";
    state.jwt = data.token;
    state.authflow = true;
    router.push("/")
  },
  setErrMsg: (state, errmsg) => {
    state.errMsg = errmsg;
    state.user = null;
    state.jwt = "";
  },
  setAuthFlowFalse: ()=> {
    state.authflow = false;
  },
  redirectRegister: () => {
    state.authflow = true;
    router.push("/confirm-email")
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
