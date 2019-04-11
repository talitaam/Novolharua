import Assignment from "@material-ui/icons/Assignment";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Map from "@material-ui/icons/Map";

import CadDoacao from "screens/Agendamento/CadDoacao.jsx";
import Maps from "screens/Maps/Maps.jsx";
import ListarDoacoes from "./screens/Agendamento/ListarDoacoes";

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
    component: Maps,
    layout: "/doador"
  }
];

export default dashboardRoutes;
