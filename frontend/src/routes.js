// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Assignment from "@material-ui/icons/Assignment";
import LocationOn from "@material-ui/icons/LocationOn";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import CadDoacao from "views/Agendamento/CadDoacao.jsx";
import Maps from "views/Maps/Maps.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/doador"
  },
  {
    path: "/user",
    name: "Meu Perfil",
    icon: Person,
    component: UserProfile,
    layout: "/doador"
  },
  {
    path: "/agendamento",
    name: "Agendamento",
    icon: Assignment,
    component: CadDoacao,
    layout: "/doador"
  },
  {
    path: "/maps",
    name: "Mapas",
    icon: LocationOn,
    component: Maps,
    layout: "/doador"
  }
];

export default dashboardRoutes;
