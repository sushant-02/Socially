import socially from "../../api/socially";

const state = {
  posts: [],
};

const getters = {
  getPosts: () => state.posts,
};

const actions = {
  async fetchPosts({ commit }, userId) {
    try {
      const res = await socially.get(`/posts/${userId}`);
      commit("setPosts", res.data)
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