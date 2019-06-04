import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "components/Card/CardHeader.jsx";
import React from "react";
import CardBody from "../../components/Card/CardBody";
import CustomTable from "../../components/CustomTable/CustomTable";
import UserService from "./UserService";
import withStyles from "@material-ui/core/styles/withStyles";

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

class ListarUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.classes = this.props.classes;
    this.state = {
      rows: []
    };
    this.tableColumns = [
      "ID",
      "CPF/CNPJ",
      "Nome do doador",
      "Telefone Fixo",
      "Telefone Celular",
      "Email",
      "Obs",
      "",
      "Ações",
      ""
    ];
    this.ativarDoador = this.ativarDoador.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  getUsers () {
    return UserService.fecthUser().then(json => {
      if (json) {
        const doadores = json.doadores;
        
        this.setState({
          rows: doadores.map(doador => Object.values(doador).map((valor, index) => { 
            if(index === 3) {
              return "(" + valor.slice(0,2) + ") " + valor.slice(2, 6) + " - " + + valor.slice(6,10);
            } else if(index === 4) {
              return "(" + valor.slice(0,2) + ") " + valor.slice(2, 7) + " - " + + valor.slice(7,11);
            } else if(index === 7) {
              return (valor + '') === '0' ? 'Pendente' : 'Ativo';
            } else {
              return valor + "";
            }}))
        });
      }
    });
  }

  componentDidMount() {
    this.getUsers();
  }

  ativarDoador(event) {
    const tableIndex = event.currentTarget.tabIndex;
    const rows =  this.state.rows.slice(0);
    const selectedRow = rows[tableIndex]; 
     
    // Getting donator's ID :
    const donatorsId = selectedRow[0];  

    UserService.activateUser(donatorsId).then(response => {
      alert("O usuário foi ativado com sucesso  !");
      this.getUsers()
    });
  }

  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={this.classes.cardTitleWhite}>
                  Lista de Doadores
                </h4>
              </CardHeader>
              <CardBody>
                <CustomTable
                  tableHeaderColor="warning"
                  tableHead={this.tableColumns}
                  tableData={this.state.rows}
                  onClickRowButton={this.ativarDoador}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(ListarUsuario);
