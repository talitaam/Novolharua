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
      image: ''
    };

    this.enviarDados = this.enviarDados.bind(this);
    this.buscarRotas = this.buscarRotas.bind(this);
    this.changeData =  this.changeData.bind(this);
  }
  
  buscarRotas () {
    fetch('http://localhost:3001/rotas/', {
      method: "POST", 
      body: JSON.stringify(moment().format('YYYY-MM-DD'))
    })
    .then((res) => res.json())
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

  changeImage (image) {
    this.setState({'image': image});
  }

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
            <div id="map"> <img src={this.state.image} /></div>
            {/* <Maps /> */}
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