import serverParams from "variables/server.jsx";

class RotasService {
  constructor() {
    this.MIN_ROUTES_POINTS = 2;
    this.DEFAULT_TRAVEL_MODE = "WALKING";
  }

  fecthRoutes() {
    const fetchData = {
      method: "GET"
    };
    return fetch(serverParams.SERVER_URL + "rota/", fetchData).then(res =>
      res.json()
    );
  }

  fetchRouteById(id) {
    const fetchData = {
      method: "POST",
      body: JSON.stringify({ routeId: id })
    };
    return fetch(serverParams.SERVER_URL + "rota/findById", fetchData).then(
      res => res.json()
    );
  }

  fetchAvaiableRoutesByDate(date) {
    const fetchData = {
      method: "POST",
      body: JSON.stringify({ date: date })
    };
    return fetch(serverParams.SERVER_URL + "rota/findByDate", fetchData).then(
      res => res.json()
    );
  }

  findRoutes() {
    return this.fecthRoutes();
  }

  findRouteById(id) {
    return this.fetchRouteById(id);
  }

  findAvaiableRoutesByDate(date) {
    return this.fetchAvaiableRoutesByDate(date);
  }

  saveRoute({
    routeName,
    mapsRoute,
    userRoute,
    minPessoas,
    maxPessoas,
    startAddress,
    endAddress,
    distance,
    obs
  }) {
    let data = {
      nomeRota: routeName,
      rotaMaps: {
        points: mapsRoute
      },
      rotaUsuario: {
        points: userRoute.map(({ location }) => ({
          lat: location.lat(),
          lng: location.lng()
        }))
      },
      numMinPessoas: minPessoas,
      numMaxPessoas: maxPessoas,
      origem: startAddress,
      destino: endAddress,
      distancia: distance,
      observacao: obs
    };

    return fetch(serverParams.SERVER_URL + "/rota/add", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .catch(error => {
        alert("Erro ao enviar cadastro de rota !");
      });
  }
}

export default new RotasService();
