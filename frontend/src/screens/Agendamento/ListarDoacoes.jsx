import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Table from "components/Table/Table.jsx";

import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import DoacoesService from "./DoacoesService";

import { Link } from "react-router-dom";


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
    constructor(props) {
        super(props);
        this.classes = this.props.classes;
        this.state = {
            rows: []
        };
        this.tableColumns = [
            "Nome do doador",
            "Data",
            "Região"
        ];
    }

    componentDidMount() {
        DoacoesService.fetchDoacoes().then((response) => {
            if (response) {
                const { doacoes } = response;

                this.setState({
                    rows: doacoes.map(doacao => Object.values(doacao))
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
                        <Link to='/doador/agendamento' >
                            <Button color="primary" position="center" >Cadastrar Doação</Button>
                        </Link>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                    </GridItem>
                </GridContainer>
            </div>
        );
    };
}

export default withStyles(styles)(ListarDoacoes);