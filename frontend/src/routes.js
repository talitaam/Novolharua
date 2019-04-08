// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Assignment from "@material-ui/icons/Assignment";
import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";

// core components/screens for Admin layout
import DashboardPage from "screens/Dashboard/Dashboard.jsx";
import UserProfile from "screens/UserProfile/UserProfile.jsx";
import CadDoacao from "screens/Agendamento/CadDoacao.jsx";
import Maps from "screens/Maps/Maps.jsx";
import ListarDoacoes from "./screens/Agendamento/ListarDoacoes";

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
    path: "/listarAgendamentos",
    name: "Listar Agendamentos",
    icon: Assignment,
    component: ListarDoacoes,
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
