import { createApp } from "vue";
import store from "./store";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {fontAwesomeIcons} from "./icons/icons";
import "./assets/main.scss";
import App from "./App.vue";

library.add(fontAwesomeIcons);

createApp(App)
  .use(router)
  .use(store)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .mount("#app");
