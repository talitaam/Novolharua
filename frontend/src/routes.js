import Assignment from "@material-ui/icons/Assignment";
import CalendarToday from "@material-ui/icons/CalendarToday";

import CadDoacao from "screens/Agendamento/CadDoacao.jsx";
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
  }
];

export default dashboardRoutes;
