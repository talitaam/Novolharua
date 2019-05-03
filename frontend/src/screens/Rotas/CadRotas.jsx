import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

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

const MAX_ROUTE_POINTS = 10;

class CadRotas extends React.Component {
    constructor() {
        super();

        this.state = {
            infoPeople: '',
            routeName: '',
            directions: [],
            waypoints: [],

        };

        this.saveRoute = this.saveRoute.bind(this);

        this.onChangeInfoPeople = this.onChangeInfoPeople.bind(this);
        this.onChangeRouteName = this.onChangeRouteName.bind(this);
        this.onClickMap = this.onClickMap.bind(this);
        this.onRightClickMap = this.onRightClickMap.bind(this);

        this.cleanMap = this.cleanMap.bind(this);
    }

    onChangeInfoPeople(event) {
        this.setState({
            infoPeople: event.target.value
        })
    }

    onChangeRouteName(event) {
        this.setState({
            routeName: event.target.value
        })
    }

    onClickMap(event) {
        const { waypoints } = this.state;
        if (waypoints.length > MAX_ROUTE_POINTS) {
            alert('Limite de pontos máximo atigido ! Não é possível adicionar mais pontos !');
        } else {
            waypoints.push({
                location: event.latLng,
                stopover: true
            });

            this.setState({
                waypoints: waypoints,
                userRoute: waypoints
            });
        }
    }

    onRightClickMap() {
        const { google } = window;
        const { waypoints } = this.state;

        if (!waypoints.length || waypoints.length < 2) {
            alert('Pontos insuficientes para calcular uma rota ! É preciso de no mínimo 2 !');
        } else {
            const waypointsAux = waypoints.slice(0);
            const origin = waypointsAux.shift().location;
            const destination = waypointsAux.pop().location;

            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: origin,
                destination: destination,
                waypoints: waypointsAux,
                travelMode: google.maps.TravelMode['WALKING'],
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    const mapsRoute = result.routes[0].overview_path.map(point => { return ({ lat: point.lat(), lng: point.lng() }); });
                    this.setState({
                        waypoints: [],
                        mapsRoute: mapsRoute,
                        directions: result
                    });
                } else {
                    alert(`Erro ao buscar rota : ${result}`);
                }
            });
        }
    }

    saveRoute() {
        const { nomeRota, qtdPessoas, rotaMaps, rotaUsuario } = this.state;

        let data = {
            nomeRota: nomeRota,
            qtdPessoas: qtdPessoas,
            rotaMaps: {
                points: rotaMaps
            },
            rotaUsuario: {
                points: rotaUsuario.map(({ location }) => ({ lat: location.lat(), lng: location.lng() }))
            }
        };

        if (rotaUsuario) {
            alert("É preciso que uma rota seja selecionada!");
        } else {
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

    cleanMap() {
        this.setState({
            waypoints: [],
            rotaMaps: [],
            rotaUsuario: []
        });
    }

    render() {
        const { routeName, infoPeople, waypoints, directions } = this.state;

        return (
            <>
                <GridContainer justify="center" alignItems="baseline">
                    <GridItem xs={12} sm={12} md={8}>
                        <CustomInput
                            labelText="Nome da rota:"
                            id="nmRota"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: routeName,
                                onChange: this.onChangeRouteName
                            }}
                        />
                        <CustomInput
                            labelText="Número de pessoas atendidas:"
                            id="nroPessoas"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: infoPeople,
                                onChange: this.onChangeInfoPeople
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Button color="danger" onClick={this.cleanMap}>Limpar Marcadores</Button>
                        <Button color="success" onClick={this.saveRoute}>Salvar</Button>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Direction waypoints={waypoints}
                            directions={directions}
                            onClick={this.onClickMap}
                            onRightClick={this.onRightClick} />
                    </GridItem>
                </GridContainer>
            </>
        );
    }
}


export default (withStyles(styles)(CadRotas));
