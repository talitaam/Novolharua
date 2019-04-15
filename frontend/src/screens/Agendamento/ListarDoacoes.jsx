import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Table from "components/Table/Table.jsx";

import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

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

class ListarDoacoes extends React.Component {
  tableColumns = [
    "Nome do doador", 
    "Data", 
    "Região"
  ];  
  
  constructor(props) {
    super(props);
    this.classes = this.props.classes; 
    this.state = {
      rows : []
    };
  }

  componentDidMount () {
    fetch('http://localhost:3001/doacao/', {
      method: "POST"
    })
    .then((res) => res.json())
    .then((response) => {
      let rows = [];
      let doacoes = response.doacoes;

      if(doacoes) {
        response.doacoes.forEach(obj => {
          let aux = Object.values(obj);          
          rows.push(aux); 
        });  
        this.setState({
          rows: rows
        });
      }
    }); 
  }
  
  render () {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="warning">
                    <h4 className={this.classes.cardTitleWhite}>Lista de Agendamentos Realizados</h4>
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
          <GridItem xs={4} sm={4} md={4}> 
          </GridItem>
          <GridItem xs={4} sm={4} md={4}>
            <Button color="primary" position="center" href = "/doador/agendamento">Cadastrar Doação</Button> 
          </GridItem>
          <GridItem xs={4} sm={4} md={4}> 
          </GridItem>
        </GridContainer>
      </div>
    );
  };
}

export default withStyles(styles)(ListarDoacoes);