import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import Home from "./components/Home";

const routes = [
  {
    path: "/",
    name: "",
    component: Home
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  }
];

export default routes;
