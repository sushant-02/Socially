import { useToast } from "vue-toastification";
import socially from "../../api/socially";
import router from "../../router/index";

const toast = useToast();

const getDefaultState = () => {
  return {
    authflow: false,
    user: null,
    otherUser: null,
  };
};

const state = getDefaultState();

const getters = {
  getAuthflow: () => state.authflow,
  getUser: () => state.user,
  getOtherUser: () => state.otherUser,
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
  async fetchUser({ commit }) {
    try {
      const res = await socially.get("/user");
      commit("updateUser", res.data.user);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchUserById({ commit }, userId) {
    try {
      const res = await socially.get(`/user/${userId}`);
      commit("updateOtherUser", res.data.user);
    } catch (error) {
      console.log(error);
    }
  },
  async updateUserInfo({ commit }, userInfo) {
    try {
      const res = await socially.patch(`/user/${state.user._id}`, userInfo);
      toast.success("User information updated successfully.");
      commit("updateUser", res.data.user);
    } catch (error) {
      toast.error(error.response.data.errors.msg);
      console.log(error);
    }
  },
  async followAUser({ commit }, userId) {
    try {
      const res = await socially.patch("/user/follow", { followId: userId });
      commit("updateUser", res.data.user);
    } catch (error) {
      console.log(error);
    }
  },
  async unfollowAUser({ commit }, userId) {
    try {
      const res = await socially.patch("/user/unfollow", {
        unfollowId: userId,
      });
      commit("updateUser", res.data.user);
    } catch (error) {
      console.log(error);
    }
  },
  async logoutUser({ commit }) {
    window.localStorage.removeItem("JWT");
    commit("resetState");
  },
  async deleteUser({ commit }) {
    try {
      await socially.delete("/user");
      window.localStorage.removeItem("JWT");
      commit("resetState");
      toast.success("Account deleted successfully.");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  setUser: (state, data) => {
    state.user = data.user;
    state.authflow = true;

    if (data.token !== undefined)
      window.localStorage.setItem("JWT", data.token);

    if (data.user.confirmed === false) {
      router.push("/confirm-email");
    } else {
      router.push("/");
    }
  },
  updateUser: (state, user) => {
    state.user = user;
  },
  updateOtherUser: (state, otherUser) => {
    state.otherUser = otherUser;
  },
  showErrMsg: (state, errmsg) => {
    state.user = null;

    toast.error(errmsg);
  },
  redirectRegister: () => {
    state.authflow = true;
    router.push("/confirm-email");
  },
  resetState: () => {
    Object.assign(state, getDefaultState());
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
