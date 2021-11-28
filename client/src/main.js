import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import store from "./store";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {fontAwesomeIcons} from "./icons/icons";
import "./assets/main.scss";
import App from "./App.vue";

library.add(fontAwesomeIcons);

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true,
  position: "bottom-center",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
}

createApp(App)
  .use(router)
  .use(store)
  .use(Toast, options)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .mount("#app");
