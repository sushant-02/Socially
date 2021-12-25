import socially from "../../api/socially";

const state = {
  posts: [],
  otherUserPosts: []
};

const getters = {
  getPosts: () => state.posts,
  getOtherUserPosts: () => state.otherUserPosts,
};

const actions = {
  async fetchPosts({ commit }) {
    try {
      const res = await socially.get("/posts");
      commit("setPosts", res.data.posts);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchPostsByUserId({ commit }, userId) {
    try {
      const res = await socially.get(`/posts/${userId}`);
      commit("setOtherUserPosts", res.data.posts);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  setPosts: (state, posts) => {
    state.posts = posts;
  },
  setOtherUserPosts: (state, otherPosts) => {
    state.otherUserPosts = otherPosts;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
