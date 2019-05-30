import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "components/Card/CardHeader.jsx";
import React from "react";
import CardBody from "../../components/Card/CardBody";
import Table from "../../components/Table/Table";
import Link from "@material-ui/core/Link";
import Button from "../../components/CustomButtons/Button";
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
      "Obs"
    ];
  }

  componentDidMount() {
    UserService.findUsers().then(json => {
      this.setDoador(json);
    });
  }

  setDoador({ doador }) {
    this.setState({
      rows: doador.map(usuario => Object.values(usuario))
    });
  }

  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4>
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
          <GridItem xs={4} sm={4} md={4} />
          <GridItem xs={4} sm={4} md={4}>
            <Link to="/doador">
              <Button color="primary" position="center">
                Cadastrar Doação
              </Button>
            </Link>
          </GridItem>
          <GridItem xs={4} sm={4} md={4} />
        </GridContainer>
      </div>
    );
  }
}

export default ListarUsuario;
