import { useToast } from "vue-toastification";
import socially from "../../api/socially";
import router from '../../router/index';

const toast = useToast();

const state = {
  authflow: false,
  user: null,
};

const getters = {
  getAuthflow: () => state.authflow,
  getUser: () => state.user,
};

const actions = {
  async loginUser({ commit }, loginInfo) {
    try {
      const res = await socially.post("/user/signin", loginInfo);
      commit("setUser", res.data);
    } catch (error) {
      console.log(error.response.data.errors.msg);
      commit("showErrMsg", error.response.data.errors.msg);
    }
  },
  async registerUser({ commit }, registerInfo) {
    try {
      await socially.post("/user/signup", registerInfo);
      commit("redirectRegister");
    } catch (error) {
      console.log(error.response.data.errors.msg);
      commit("showErrMsg", error.response.data.errors.msg);
    }
  },
};

const mutations = {
  setUser: (state, data) => {
    state.user = data.user;
    state.authflow = true;
    
    if (data.token !== undefined)
      window.localStorage.setItem("JWT", data.token);

    if(data.user.confirmed === false) {
      router.push("/confirm-email")
    } else {
      router.push("/")
    }
  },
  showErrMsg: (state, errmsg) => {
    state.user = null;

    toast.error(errmsg);
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
