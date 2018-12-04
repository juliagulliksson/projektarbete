import Register from "./components/views/Register";
import Login from "./components/views/Login";
import Dashboard from "./components/views/Dashboard";
import Logout from "./components/views/Logout";
import Home from "./components/views/Home";
import SingleQuestion from "./components/views/SingleQuestion";

const routes = [
  {
    path: "/",
    name: "home",
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
    },
    props: true
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
  },
  {
    path: "/question-:id",
    name: "singleQuestion",
    component: SingleQuestion
  }
];

export default routes;
