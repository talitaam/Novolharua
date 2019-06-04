import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import Map from "components/Map/Map.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput";
import TextArea from "../../components/TextArea/TextArea.jsx";
import Badge from "../../components/Badge/Badge";

import DirectionsHelper from "components/Map/DirectionsHelper.js";
import RotasService from "./RotasService";
import Typography from "@material-ui/core/Typography";

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
				routes: []
			},
			arrDirections: [],
			polylines: [],
			mapsRoute: [],
			mapsRouteReverse: [],
			userRoute: [],
			waypoints: [],
			minPessoas: 1,
			maxPessoas: 1,
			startAddress: '',
			endAddress: '',
			distance: '',
			obs: ''
		};

		this.saveRoute = this.saveRoute.bind(this);

		this.onChangeRouteName = this.onChangeRouteName.bind(this);
		this.onChangeMaxPessoas = this.onChangeMaxPessoas.bind(this);
		this.onChangeMinPessoas = this.onChangeMinPessoas.bind(this);
		this.onChangeObservation = this.onChangeObservation.bind(this);
		this.cleanFields = this.cleanFields.bind(this);
		this.onClickMap = this.onClickMap.bind(this);
		this.onRightClickMap = this.onRightClickMap.bind(this);
	}

	onChangeRouteName(event) {
		this.setState({
			routeName: event.target.value
		});
	}

	onChangeMaxPessoas(event) {
		this.setState({
			maxPessoas: event.target.value
		});
	}

	onChangeMinPessoas(event) {
		this.setState({
			minPessoas: event.target.value
		});
	}

	onChangeObservation(event) {
		this.setState({
			obs: event.target.value
		});
	}

	onClickMap(event) {
		const { waypoints } = this.state;
		if (waypoints.length >= MAX_ROUTE_POINTS) {
			alert(
				"Limite de pontos máximo atigido ! Não é possível adicionar mais pontos !"
			);
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

		return DirectionsHelper.getRouteAPI(waypoints).then(result => {
			const route = result.routes[0];
			const leg = route.legs[0];

			const mapsRoute = route.overview_path.map(point => { return ({ lat: point.lat(), lng: point.lng() }); });
			const distance = leg.distance.text;
			const startAddress = leg.start_address;
			const endAddress = leg.end_address;

			this.setState({
				waypoints: [],
				mapsRoute: mapsRoute,
				directions: result,
				distance: distance,
				startAddress: startAddress,
				endAddress: endAddress
			});
		}).then(() => {
			return DirectionsHelper.getRouteAPI(waypoints.slice(0).reverse()).then(result => {
				const route = result.routes[0];

				const mapsRoute = route.overview_path.map(point => { return ({ lat: point.lat(), lng: point.lng() }); });

				this.setState({
					mapsRouteReverse: mapsRoute
				});
			});
		});
	}

	saveRoute() {
		const { routeName, mapsRoute, userRoute, minPessoas, maxPessoas, startAddress, endAddress, distance, obs, mapsRouteReverse } = this.state;
		const saveData = {
			routeName,
			mapsRoute,
			mapsRouteReverse,
			userRoute,
			minPessoas,
			maxPessoas,
			startAddress,
			endAddress,
			distance,
			obs
		};

		let canSave = true;

		if (!(routeName + '').trim()) {
			alert("O campo nome da rota deve ser preenchido!");
			canSave = false;
		}

		if (parseInt(minPessoas) <= 0 || parseInt(maxPessoas) <= 0) {
			alert("A quantidade estimada de pessoas não pode ser zero ou abaixo de zero");
			canSave = false;
		}

		if (parseInt(minPessoas) > parseInt(maxPessoas)) {
			alert("A quantidade máxima estimada de pessoas não pode ser menor que a minima");
			canSave = false;
		}

		if (!mapsRoute || !mapsRoute.length) {
			alert("É preciso que uma rota seja selecionada!");
			canSave = false;
		}

		if (canSave) {
			RotasService.saveRoute(saveData).then(json => {
				if (json)
					alert(json.message);
				const { overlappingRoutes }  = json;
				if (!!overlappingRoutes) {
					const promises = [];
					const { google } = window;
					let routeFormattedToMaps;

					overlappingRoutes.forEach(route => {
						routeFormattedToMaps = route.overlapRoute.map(point => ({
							location: new google.maps.LatLng(parseFloat(point.lat), parseFloat(point.lng))
						}));

						promises.push(
							new Promise((resolve, reject) =>
								DirectionsHelper.getRouteAPI(routeFormattedToMaps)
									.then(result => resolve(result))
									.catch(() => console.log(routeFormattedToMaps))
							)
						);
					});

					Promise.all(promises).then(mapsAPIRoutes => this.setState({
						polylines: mapsAPIRoutes.map(mapsAPIroute => ({
							coordinates: mapsAPIroute.routes[0].overview_path,
							options: {
								strokeColor: '#' + (Math.random() + "").slice(4,10)
							},
							geodesic: false
						})),
						waypoints: overlappingRoutes.map(routeInfo => routeInfo.overlapRoute)
													.reduce((actual, next) => actual.concat(next) )
													.map((point) => ({location: new google.maps.LatLng(parseFloat(point.lat), parseFloat(point.lng))}))
					}));
						
				} else {
					this.cleanFields();
				}
			});
		}
	};

	cleanFields() {
		this.setState({
			routeName: '',
			minPessoas: 1,
			maxPessoas: 1,
			waypoints: [],
			mapsRoute: [],
			userRoute: [],
			directions: {
				routes: []
			},
			arrDirections: [],
			polylines: [],
			obs: ''
		});
	}

	render() {
		const {
			routeName,
			waypoints,
			directions,
			minPessoas,
			maxPessoas,
			obs,
			arrDirections,
			polylines
		} = this.state;

		return (
			<>
				<GridContainer justify="flex-start" alignItems="center">
					<GridItem xs={12} sm={12} md={4}>
						<Typography variant="h6" gutterBottom>
							Instruções
            			</Typography>
						<Typography variant="body2" gutterBottom>
							Para traçar uma rota clique com o botão esquerdo do mouse em
							qualquer ponto. Para gerar uma rota clique com o botão direito em
							qualquer ponto no mapa. Serão aceitos no máximo 10 pontos.
           	 			</Typography>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
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
							labelText="Min Pessoas:"
							id="minPessoas"
							formControlProps={{
								fullWidth: true
							}}
							inputProps={{
								type: "number",
								value: minPessoas,
								onChange: this.onChangeMinPessoas
							}}
						/>
						<CustomInput
							labelText="Max Pessoas:"
							id="maxPessoas"
							formControlProps={{
								fullWidth: true
							}}
							inputProps={{
								type: "number",
								value: maxPessoas,
								onChange: this.onChangeMaxPessoas
							}}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<TextArea
							inputProps={{
								text: obs,
								onChange: this.onChangeObservation
							}}
						/>
						<GridItem xs={12} sm={12} md={12}>
							<Button color="danger" onClick={this.cleanFields}>
								Limpar Dados
              				</Button>
							<Button color="success" onClick={this.saveRoute}>
								Salvar
              				</Button>
						</GridItem>
					</GridItem>
					<GridItem xs={12} sm={12} md={12}>
						<Badge maxValue={MAX_ROUTE_POINTS}
							actualValue={waypoints.length} />
						<Map
							waypoints={waypoints}
							directions={directions}
							arrDirections={arrDirections}
							polylines={polylines}
							onClick={this.onClickMap}
							onRightClick={this.onRightClickMap}
						/>
					</GridItem>
				</GridContainer>
			</>
		);
	}
}
export default withStyles(styles)(CadRotas);
