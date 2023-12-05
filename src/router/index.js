import { createRouter, createWebHistory } from "vue-router";
import Check from "../views/Check.vue";
import Custom from "../views/Custom.vue";
import About from "../views/About.vue";
import Library from "../views/Library.vue";
import User from "../views/User.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Bopomofo from "../views/Bopomofo.vue";

const routes = [
  {
    path: "/",
    name: "check",
    component: Check,
  },
  {
    path: "/custom",
    name: "custom",
    component: Custom,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/library",
    name: "library",
    component: Library,
    children: [
      {
        name: "bopomofo",
        path: ":bopomofoId",
        component: Bopomofo,
        props: true,
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: User,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
