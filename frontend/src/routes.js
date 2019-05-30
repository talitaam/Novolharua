import Assignment from "@material-ui/icons/Assignment";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Map from "@material-ui/icons/Map";
import Navigation from "@material-ui/icons/Navigation";
import PersonAdd from "@material-ui/icons/PersonAdd";

import CadDoacao from "screens/Agendamento/CadDoacao";
import CadRotas from "./screens/Rotas/CadRotas";
import ListarDoacoes from "./screens/Agendamento/ListarDoacoes";
import ListarRotas from "screens/Rotas/ListarRotas";
import CadUsuario from "screens/Usuario/CadUsuario";
import ListarUsuario from "./screens/Usuario/ListarUsuario";

const dashboardRoutes = [
  {
    path: "/agendamento",
    name: "Agendamento",
    icon: CalendarToday,
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
    path: "/visualizarRotas",
    name: "Visualizar Rotas",
    icon: Map,
    component: ListarRotas,
    layout: "/doador"
  },
  {
    path: "/cadRotas",
    name: "Cadastro de Rotas",
    icon: Navigation,
    component: CadRotas,
    layout: "/doador"
  },
  {
    path: "/CadUsuario",
    name: "Cadastro Usuário",
    icon: PersonAdd,
    component: CadUsuario,
    layout: "/doador"
  },
  {
    path: "/ListarUsuario",
    name: "Listar Usuário",
    icon: Assignment,
    component: ListarUsuario,
    layout: "/doador"
  }
];

export default dashboardRoutes;
