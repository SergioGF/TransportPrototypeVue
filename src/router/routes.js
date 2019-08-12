import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";

// Pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import CloseStops from "@/pages/CloseStops.vue";
import Crowded from "@/pages/Crowded.vue";
import Schedule from "@/pages/Schedule.vue";
import Login from "@/pages/Login.vue";
import SignUp from "@/pages/SignUp.vue";
import Help from "@/pages/Help.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "login",
        name: "login",
        component: Login
      },
      {
        path: "signup",
        name: "signup",
        component: SignUp
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "crowded",
        name: "Crowded",
        component: Crowded
      },
      {
        path: "closeStops",
        name: "Close Stops",
        component: CloseStops
      },
      {
        path: "schedule",
        name: "Schedule",
        component: Schedule
      },
      {
        path: "help",
        name: "Help",
        component: Help
      }
    ]
  }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
