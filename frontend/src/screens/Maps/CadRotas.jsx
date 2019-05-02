import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import $ from "jquery";

import Direction from "components/Direction/Direction.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput";
import Map from "components/Map/Map.jsx";

import moment from "moment";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const mapsPlaces = [
  {
    id: "praca_liberdade",
    defaultBounds: {
      north: -19.929512,
      south: -19.933168,
      east: -43.933712,
      west: -43.940968
    },
    defaultUrl: "https://i.ibb.co/xmL7qjT/Rota-Pra-a-da-Liberdade.jpg",
    defaultZoom: 17.3,
    defaultCenter: { lat: -19.93134, lng: -43.93734 }
  },
  {
    id: "praca_savassi",
    defaultZoom: 17.3,
    defaultBounds: {
      north: -19.936686,
      south: -19.939718,
      east: -43.933951,
      west: -43.939428
    },
    defaultCenter: { lat: -19.938202, lng: -43.9366895 },
    defaultUrl: "https://i.ibb.co/FgRtynK/Rota-Praca-Savassi.jpg"
  },
  {
    id: "area_hospitalar",
    defaultZoom: 17.3,
    defaultBounds: {
      north: -19.922602,
      south: -19.926201,
      east: -43.923093,
      west: -43.929062
    },
    defaultCenter: { lat: -19.9244015, lng: -43.9260775 },
    defaultUrl: "https://i.ibb.co/F4GzSn5/Rota-Area-Hospitalar.jpg"
  }
];

class CadRotas extends React.Component {
  constructor() {
    super();
    this.message = "Rota agendada com sucesso!";

    this.state = {
      rota: "",
      rotas: [],
      map: []
    };

    this.cadastrarRota = this.cadastrarRota.bind(this);
    this.buscarRotas = this.buscarRotas.bind(this);
    this.changeRoute = this.changeRoute.bind(this);
    this.renderMap = this.renderMap.bind(this);
    window.canUpdate = true;
  }

  componentDidMount() {
    // this.buscarRotas();
  }

  fetchRotas(date) {
    date = date || moment();

    return fetch("http://localhost:3001/rota/", {
      method: "POST",
      body: JSON.stringify({ data: moment(date).format("YYYY-MM-DD") })
    }).then(res => res.json());
  }

  buscarRotas() {
    this.fetchRotas().then(json => {
      const rotas = Object.values(json.rotas);
      this.setState({
        rotas: rotas,
        rota: rotas.length > 0 ? rotas[0] : "",
        map: rotas.filter(map => map.id === rotas[0].id)
      });
    });
  }

  cadastrarRota() {
    const doacao = {
      rota: this.state.rota.id
    };
    let data = {
      nomeRota: $("#nmRota").val(),
      qtdPessoas: $("#nroPessoas").val(),
      rotaMaps: {
        points: window.mapsRoute
      },
      rotaUsuario: {
        points: window.waypoints
      }
    };
    let canSave = true;

    if (!window.mapsRoute) {
      alert("É preciso que uma rota seja selecionada!");
      canSave = false;
    }

    if (canSave) {
      fetch("http://localhost:3001/rota/add", {
        method: "POST",
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          alert(json.message);
        })
        .catch(error => {
          alert("Erro ao enviar cadastro de rota");
        });
    }
  }

  changeRoute(rota) {
    const maps = mapsPlaces.filter(map => map.id === rota.value);
    this.setState({
      map: maps,
      rota: rota
    });
  }

  renderMap(mapData) {
    const {
      id,
      defaultBounds,
      defaultUrl,
      defaultZoom,
      defaultCenter
    } = mapData;

    return (
      <Map
        key={id}
        defaultBounds={defaultBounds}
        defaultUrl={defaultUrl}
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
      />
    );
  }

  limparCampos() {
    $("#nmRota").val("");
    $("#nroPessoas").val("");
    window.waypoints = [];
  }

  render() {
    const modesOfTraveling = [
      {
        label: "Driving",
        value: "DRIVING"
      },
      {
        label: "Walking",
        value: "WALKING"
      },
      {
        label: "Bicycling",
        value: "BICYCLING"
      },
      {
        label: "Transit",
        value: "TRANSIT"
      }
    ];

    return (
      <div>
        <GridContainer justify="center" alignItems="center">
          <GridItem xs={12} sm={12} md={5}>
            <CardBody>
              <h4>Instruções</h4>
              <p>
                Para traçar uma rota clique com o botão esquerdo do mouse em
                qualquer ponto. Para gerar uma rota clique com o botão direito
                em qualquer ponto no mapa. Serão aceitos no máximo 10 pontos.
              </p>
            </CardBody>
          </GridItem>
          <GridItem xs={12} sm={12} md={7}>
            <CustomInput
              labelText="Nome da rota:"
              id="float"
              formControlProps={{
                fullWidth: true
              }}
            />
            <CustomInput
              labelText="Número de pessoas atendidas:"
              id="float"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer direction="row" justify="flex-end">
          <GridItem xs={12} sm={12} md={12}>
            <Button color="danger" onClick={this.limparCampos}>
              Limpar Marcadores
            </Button>
            <Button color="success" onClick={this.cadastrarRota} children={{}}>
              Salvar
            </Button>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Direction />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(CadRotas);
