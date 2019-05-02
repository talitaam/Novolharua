import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import $ from "jquery";

import Direction from "components/Direction/Direction.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput";

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

class CadRotas extends React.Component {
    constructor() {
        super();
        this.message = "Rota agendada com sucesso!";

        this.state = {
            nroPessoas: '',
            nmRota: ''
        };

        this.cadastrarRota = this.cadastrarRota.bind(this);
        this.onChangeNroPessoas = this.onChangeNroPessoas.bind(this);
        this.onChangeNmRota = this.onChangeNmRota.bind(this);
    }
    
    onChangeNroPessoas (event) {
        this.setState({
            nroPessoas: event.target.value
        })
    }

    onChangeNmRota  (event) {
        this.setState({
            nmRota: event.target.value
        })
    }

    cadastrarRota() {
        let data = {
            nomeRota: $('#nmRota').val(),
            qtdPessoas: $('#nroPessoas').val(),
            rotaMaps : {
                points: window.mapsRoute
            },
            rotaUsuario: {
                points: window.waypoints.map(({ location }) => ({ lat: location.lat(), lng: location.lng()}))
            }
        };

        let canSave = true;

        if (!window.mapsRoute) {
            alert("É preciso que uma rota seja selecionada!");
            canSave = false;
        }

        if (canSave) {
            fetch('http://localhost:3001/rota/add',
                {
                    method: "POST",
                    body: JSON.stringify(data)
                }
            ).then(res => res.json())
                .then(json => {
                    alert(json.message);
                }).catch(error => {
                    alert("Erro ao enviar cadastro de rota");
                });
        }
    };

    limparCampos () {
        $('#nmRota').val('');
        $('#nroPessoas').val('');
        window.waypoints = [];
    }

    render() {

        return (
            <div>
                <GridContainer justify="center" alignItems="baseline">
                    <GridItem xs={12} sm={12} md={8}>
                        <CustomInput
                            labelText="Nome da rota:"
                            id="nmRota"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: this.state.nmRota,
                                onChange: this.onChangeNmRota
                            }}
                        />
                        <CustomInput
                            labelText="Número de pessoas atendidas:"
                            id="nroPessoas"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: this.state.nroPessoas,
                                onChange: this.onChangeNroPessoas
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Button color="danger" onClick={this.limparCampos}>Limpar Marcadores</Button>
                        <Button color="success" onClick={this.cadastrarRota} children={{}}>Salvar</Button>
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


export default (withStyles(styles)(CadRotas));
