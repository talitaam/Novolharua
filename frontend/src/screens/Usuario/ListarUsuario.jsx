import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "components/Card/CardHeader.jsx";
import React from "react";
import CardBody from "../../components/Card/CardBody";
import Table from "../../components/Table/Table";
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
      "Nome do doador",
      "Email",
      "CPF/CNPJ",
      "Telefone Fixo",
      "Telefone Celular",
      "Ações",
      "Obs",
      ""
    ];
  }

  componentDidMount() {
    UserService.fecthUser().then(json => {
      if (json) {
        const { doador } = json;
        this.setState({
          rows: doador.map(usuario => Object.values(usuario))
        });
      }
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
                <Table
                  tableHeaderColor="warning"
                  tableHead={this.tableColumns}
                  tableData={this.state.rows}
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
