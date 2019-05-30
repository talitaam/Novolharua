import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "components/Card/CardHeader.jsx";
import React from "react";
import CardBody from "../../components/Card/CardBody";
import Table from "../../components/Table/Table";
import UserService from "./UserService";

class ListarUsuario extends React.Component {
  constructor() {
    super();
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
                <h4>Lista de Doadores</h4>
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

export default ListarUsuario;
