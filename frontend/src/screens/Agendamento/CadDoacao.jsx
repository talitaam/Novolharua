import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Maps from "screens/Maps/Maps.jsx";
import DatePicker from "components/Date/DatePicker.jsx";
import Select from "components/Inputs/Select";
import Alert from "components/Alerts/Alert";
import $ from "jquery";
import moment from "moment";
import Map from "components/Maps/Map.jsx";

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

const mapsPlaces = {
  "praca_liberdade": {
    defaultBounds= {
      north: -19.929512,
      south: -19.933168, 
      east: -43.933712,  
      west: -43.940968
    },
    defaultUrl="https://i.ibb.co/xmL7qjT/Rota-Pra-a-da-Liberdade.jpg",
    defaultZoom=17.3,
    defaultCenter={lat: -19.93134, lng: -43.93734}
  },
  "praca_savassi": {

  },
  "area_hospitalar": {
    
  }
}

class CadDoacao extends React.Component {
  constructor() {
    super();
    this.message = "Doação agendada com sucesso!";
    this.state = { 
      nomeDoador: "",
      dataDoacao: moment().format('YYYY-MM-DD'),
      doador: {},
      rota: "",
      options: [],
      image: '',
      map: this.initMapObject()
    };

    this.enviarDados = this.enviarDados.bind(this);
    this.buscarRotas = this.buscarRotas.bind(this);
    this.changeData =  this.changeData.bind(this);
  }
  
  initMapObject() {
    return (
      {
        defaultBounds : "",  
        defaultUrl : "",
        defaultZoom : "",
        defaultCenter : ""
      }
    );
  }

  fetchRotas () {
    return fetch('http://localhost:3001/rotas/', {
      method: "POST", 
      body: JSON.stringify(moment().format('YYYY-MM-DD'))
    }).then((res) => res.json());
  }

  buscarRotas () {
    this.fetchRotas()
      .then((json) => {
        this.setState({
          options: json.rotas,
          image: window.selectedOption.image
        });
      }); 
  }

  enviarDados () {
    let doacao = { 
      doador: $('#nmDoador').val(), 
      data: this.state.dataDoacao,
      rota: window.selectedOption.value
    };

    if (!doacao.doador && !doacao.data && !doacao.rota) { 
      alert("Nome do doador não é válido! Cadastro de agendamento foi cancelado!");
    } else {
      $.ajax({
        url: 'http://localhost:3001/doacao/add', 
        type: "POST",
        crossDomain: true,
        data: { doacao },
        dataType: "json",
        success: function (response) {
          alert("Cadastro feito com sucesso!");
        },
        error: function (xhr, status) {
          alert("Erro ao enviar cadastro de agendamento");
        }
      });
    }
  };

  changeData (data) {
    console.log(data);
    fetch('http://localhost:3001/rotas/', {
      method: "POST", 
      body: moment(this.state.dataDoacao).format('YYYY-MM-DD')
    })
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        options: json.rotas,
        image: window.selectedOption.image    
      });
    }); 
  }

  changeMap () {
    const mapObj = {

    }

    defaultBounds={props.defaultBounds}
    defaultUrl={props.defaultUrl}
      defaultZoom=17.3
      defaultCenter={props.defaultCenter}

    // zoom: 

    // var imageBounds = {
    //           north: -19.929512,
    //           south: -19.933168, 
    //           east: -43.933712,  
    //           west: -43.940968
    //         };

    // center: {lat: -19.93134, lng: -43.93734}  //centro do mapa

    // https://i.ibb.co/xmL7qjT/Rota-Pra-a-da-Liberdade.jpg

  }

  render () {
    return (
      <div>
        <Alert message={this.state.message}/>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Doador :"
                  id="nmDoador"
                  inputProps = {this.state.doador}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <DatePicker selected={this.state.dataDoacao} onChange={this.changeData} />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Select options={this.state.options} value={this.state.rota} />
              </GridItem>
            </GridContainer> 
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            {/* <Maps /> */}
            <Map 
              defaultBounds={this.state.defaultBounds}
              defaultUrl={this.state.defaultUrl}
              defaultZoom={this.state.defaultZoom}
              defaultCenter={this.state.defaultCenter}
            />
          </GridItem>
          <GridItem xs={4} sm={4} md={4}></GridItem>
          <GridItem xs={4} sm={4} md={4}>
          <Button color="primary" onClick = {this.enviarDados}>Cadastrar Doação</Button> 
          </GridItem>
          <GridItem xs={4} sm={4} md={4}></GridItem>
        </GridContainer>
      </div>
    );
  };
}

export default (withStyles(styles)(CadDoacao));