import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage';
import Register from '../views/RegisterPage';
import Login from '../views/LoginPage';
import AddPost from "../components/AddPost/AddPost";
import ConfirmEmail from "../components/Auth/ConfirmEmail";
import VerifyingEmail from "../components/Auth/VerifyingEmail";
import ResetPassword from "../components/Auth/ResetPassword";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    children: [
      {
        path: "/add-post",
        name: "Add Post",
        component: AddPost
      }
    ]
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
  },
  {
    path: "/reset-password",
    name: "Reset password email",
    component: ResetPassword
  },
  {
    path: "/reset-password/:token",
    name: "Reset password new",
    component: ResetPassword
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;