import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import About from "../components/About.vue";
import Custom from "../components/Custom.vue";
import Library from "../components/Library.vue";
import SignUp from "../components/SignUp.vue";
import Login from "../components/Login.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/custom",
    name: "custom",
    component: Custom,
  },
  {
    path: "/library",
    name: "library",
    component: Library,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
