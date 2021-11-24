import { createStore } from "vuex";
import Auth from "./modules/Auth";
import Posts from "./modules/Posts";

const store = createStore({
  modules: {
    Auth,
    Posts
  },
});

export default store;
