import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage';
import Register from '../views/RegisterPage';
import Login from '../views/LoginPage';

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/login",
    name: "SignIn",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;