import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import Map from "components/Map/Map.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput";

import DirectionsHelper from "components/Map/DirectionsHelper.js";
import RotasService from "./RotasService";

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
            directions: {
				routes:[]
			},
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
        const { waypoints } = this.state;
        DirectionsHelper.getRouteAPI(waypoints, result => {
            const mapsRoute = result.routes[0].overview_path.map(point => { return ({ lat: point.lat(), lng: point.lng() }); });
            this.setState({
                waypoints: [],
                mapsRoute: mapsRoute,
                directions: result
            });
        });
    }

    saveRoute() {
        const { routeName, infoPeople, mapsRoute, userRoute } = this.state;
        const saveData = {
            routeName,
            infoPeople,
            mapsRoute,
            userRoute
        };

        if (!mapsRoute || !mapsRoute.length) {
            alert("É preciso que uma rota seja selecionada!");
        } else {
            RotasService.saveRoute(saveData).then( json => {
                if(json) 
                    alert(json.message)
            } );
        }
    };

    cleanMap() {
        this.setState({
            waypoints: [],
            mapsRoute: [],
            userRoute: [],
            directions: {
                routes: []
            }
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
                        <Map waypoints={waypoints}
                            directions={directions}
                            onClick={this.onClickMap}
                            onRightClick={this.onRightClickMap} />
                    </GridItem>
                </GridContainer>
            </>
        );
    }
}


export default (withStyles(styles)(CadRotas));
