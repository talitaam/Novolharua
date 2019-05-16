import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import Map from "components/Map/Map.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput";
import CardBody from "../../components/Card/CardBody";
import Slider from "../../components/Slider/Slider.jsx";
import TextArea from "../../components/TextArea/TextArea.jsx";

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
          routeName: '',
          directions: {
			      routes:[]
		      },
          waypoints: [],
          minPessoas: 0,
          maxPessoas: 0,
          startAddress : '',
          endAddress: '',
          distance: ''
        };

        this.saveRoute = this.saveRoute.bind(this);

        this.onChangeRouteName = this.onChangeRouteName.bind(this);
        this.onChangeMaxPessoas = this.onChangeMaxPessoas.bind(this);
        this.onChangeMinPessoas = this.onChangeMinPessoas.bind(this);
        this.cleanFields = this.cleanFields.bind(this);
        this.onClickMap = this.onClickMap.bind(this);
        this.onRightClickMap = this.onRightClickMap.bind(this);
    }

    onChangeRouteName(event) {
        this.setState({
            routeName: event.target.value
        })
    }

    onChangeMaxPessoas(event) {
        this.setState({
            maxPessoas: event.target.value
        })
    }

    onChangeMinPessoas(event) {
        this.setState({
            minPessoas: event.target.value
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
            const distance = result.routes[0].legs[0].distance.text;
            const startAddress =  result.routes[0].legs[0].start_address;
            const endAddress =  result.routes[0].legs[0].end_address;
            this.setState({
                waypoints: [],
                mapsRoute: mapsRoute,
                directions: result,
                distance : distance,
                startAddress : startAddress,
                endAddress : endAddress
            });
        });
    }

    saveRoute() {
        const { routeName, mapsRoute, userRoute, minPessoas, maxPessoas, startAddress, endAddress, distance } = this.state;
        const saveData = {
            routeName,
            mapsRoute,
            userRoute,
            minPessoas,
            maxPessoas,
            startAddress,
            endAddress,
            distance
        };

        let canSave = true;

         if(!routeName.trim()){
          alert("O campo nome da rota deve ser preenchido!");
          canSave = false;
        }

        if (minPessoas <= 0 || maxPessoas <= 0){
          alert("A quantidade estimada de pessoas não pode ser zero ou abaixo de zero");
          canSave = false;
        }

        if (minPessoas > maxPessoas){
          alert("A quantidade máxima estimada de pessoas não pode ser menor que a minima");
          canSave = false;
        }

       if (!mapsRoute || !mapsRoute.length) {
            alert("É preciso que uma rota seja selecionada!");
            canSave = false;
        }

        if (canSave){
            RotasService.saveRoute(saveData).then( json => {
                if(json)
                    alert(json.message);
                this.cleanFields();
            } );
        }
    };

    cleanFields(){
      this.setState({
        routeName: '',
        minPessoas: '',
        maxPessoas: '',
        waypoints: [],
        mapsRoute: [],
        userRoute: [],
        directions: {
            routes: []
        }
      });
    }

    render() {
        const { routeName, waypoints, directions, minPessoas, maxPessoas } = this.state;

        return (
            <>
                <CardBody>
                  <h4>Instruções</h4>
                  <p>
                    Para traçar uma rota clique com o botão esquerdo do mouse em
                    qualquer ponto. Para gerar uma rota clique com o botão direito
                    em qualquer ponto no mapa. Serão aceitos no máximo 10 pontos.
                  </p>
                </CardBody>
                <GridContainer justify="center" alignItems="baseline">
                    <GridItem xs={12} sm={12} md={12}>
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
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6}>
                      <CustomInput
                          labelText="Min Pessoas:"
                          id="minPessoas"
                          formControlProps={{
                              fullWidth: false
                          }}
                          inputProps={{
                              type: "number",
                              value: minPessoas,
                              onChange: this.onChangeMinPessoas
                          }}
                      />
                      </GridItem>
                      <GridItem xs={6} sm={6} md={6}>
                        <CustomInput
                            labelText="Max Pessoas:"
                            id="maxPessoas"
                            formControlProps={{
                                fullWidth: false
                            }}
                            inputProps={{
                                type: "number",
                                value: maxPessoas,
                                onChange: this.onChangeMaxPessoas
                            }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextArea/>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                          <Button color="danger" onClick={this.cleanFields}>Limpar Dados</Button>
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
