import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage';
import Register from '../views/RegisterPage';
import Login from '../views/LoginPage';
import ConfirmEmail from "../components/Auth/ConfirmEmail";
import VerifyingEmail from "../components/Auth/VerifyingEmail";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/login",
    name: "LogIn",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/confirm-email",
    name: "Confirm Email",
    component: ConfirmEmail
  },
  {
    path: "/confirmation/:token",
    name: "Email Verification",
    component: VerifyingEmail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;