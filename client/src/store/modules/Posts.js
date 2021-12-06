import socially from "../../api/socially";

const state = {
  posts: [],
};

const getters = {
  getPosts: () => state.posts,
};

const actions = {
  async fetchPosts({ commit }) {
    try {
      const res = await socially.get("/posts", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("JWT")}`,
        },
      });
      commit("setPosts", res.data.posts);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  setPosts: (state, posts) => {
    state.posts = posts;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
