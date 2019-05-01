import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import Direction from "components/Direction/Direction.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Select from "components/Select/Select.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput";
import Map from "components/Map/Map.jsx";

import moment from "moment";

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

const mapsPlaces = [
	{
		id: 'praca_liberdade',
		defaultBounds: {
			north: -19.929512,
			south: -19.933168,
			east: -43.933712,
			west: -43.940968
		},
		defaultUrl: "https://i.ibb.co/xmL7qjT/Rota-Pra-a-da-Liberdade.jpg",
		defaultZoom: 17.3,
		defaultCenter: { lat: -19.93134, lng: -43.93734 }
	},
	{
		id: "praca_savassi",
		defaultZoom: 17.3,
		defaultBounds: {
			north: -19.936686,
			south: -19.939718,
			east: -43.933951,
			west: -43.939428
		},
		defaultCenter: { lat: -19.938202, lng: -43.9366895 },
		defaultUrl: "https://i.ibb.co/FgRtynK/Rota-Praca-Savassi.jpg"
	},
	{
		id: "area_hospitalar",
		defaultZoom: 17.3,
		defaultBounds: {
			north: -19.922602,
			south: -19.926201,
			east: -43.923093,
			west: -43.929062
		},
		defaultCenter: { lat: -19.9244015, lng: -43.9260775 },
		defaultUrl: "https://i.ibb.co/F4GzSn5/Rota-Area-Hospitalar.jpg"
	}
];

class CadRotas extends React.Component {
    constructor() {
        super();
        this.message = "Rota agendada com sucesso!";

        this.state = {
            rota: "",
            rotas: [],
            map: []
        };

        this.cadastrarRota = this.cadastrarRota.bind(this);
        this.buscarRotas = this.buscarRotas.bind(this);
        this.changeRoute = this.changeRoute.bind(this);
        this.renderMap = this.renderMap.bind(this);
    }

    componentDidMount() {
        // this.buscarRotas();
    }

    fetchRotas(date) {
        date = date || moment();

        return fetch('http://localhost:3001/rota/', {
            method: "POST",
            body: JSON.stringify({ 'data': moment(date).format('YYYY-MM-DD') })
        }).then((res) => res.json());
    }

    buscarRotas() {
        this.fetchRotas()
            .then(json => {
                const rotas = Object.values(json.rotas);
                this.setState({
                    rotas: rotas,
                    rota: rotas.length > 0 ? rotas[0] : "",
                    map: rotas.filter(map => map.id === rotas[0].id)
                });
            });
    }

    cadastrarRota() {
        const doacao = {
            rota: this.state.rota.id
        };
        let canSave = true;

        if (!doacao.rota) {
            alert("É preciso que uma rota seja selecionada!");
            canSave = false;
        }

        if (canSave) {
            fetch('http://localhost:3001/doacao/add',
                {
                    method: "POST",
                    body: JSON.stringify(doacao)
                }
            ).then(res => res.json())
                .then(json => {
                    console.log(json);
                    alert(json.message);
                }).catch(error => {
                    alert("Erro ao enviar cadastro de rota");
                });
        }
    };

    changeRoute(rota) {
        const maps = mapsPlaces.filter(map => map.id === rota.value);
        this.setState({
            map: maps,
            rota: rota
        });
    }

    renderMap(mapData) {
        return (
            <Map
                key={mapData.id}
                defaultBounds={mapData.defaultBounds}
                defaultUrl={mapData.defaultUrl}
                defaultZoom={mapData.defaultZoom}
                defaultCenter={mapData.defaultCenter}
            />
        );
    }

    render() {
        const modesOfTraveling = [
            {
                label: "Driving",
                value: "DRIVING"
            },
            {
                label: "Walking",
                value: "WALKING"
            },
            {
                label: "Bicycling",
                value: "BICYCLING"
            },
            {
                label: "Transit",
                value: "TRANSIT"
            }
        ];
        
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Nome da rota:"
                            id="float"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Número de pessoas atendidas:"
                            id="float"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Select options={modesOfTraveling}
                            value={modesOfTraveling[0]}
                            onChange={() => { }}
                            placeholder={"Selecione :"}
                            noOptionsMessage={"Não há rotas disponíveis !"} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Button color="danger">Limpar Marcadores</Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Button color="success" onClick={this.cadastrarRota}>Salvar</Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Direction />
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}


export default (withStyles(styles)(CadRotas));