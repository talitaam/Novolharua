import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Select from "components/Select/Select.jsx";
import Map from "components/Map/Map.jsx";

import DirectionsHelper from "components/Map/DirectionsHelper";
import RotasService from "./RotasService";

class ListarRotas extends React.Component {
	constructor(props) {
		super();
		this.state = {
			directions: [],
			selectedRoute: "",
			routes: []
		};

		this.changeRoute 	= this.changeRoute.bind(this);
		this.setRoutes 		= this.setRoutes.bind(this);
		this.setDirection 	= this.setDirection.bind(this);
	}

	componentDidMount() {
		RotasService.findRoutes().then(json => {
			this.setRoutes(json);
		});
	}

	setDirection({rota}) {
		const { google } = window;
		const waypoints = rota.points
							.map((point) => ({location: new google.maps.LatLng(parseFloat(point.lat), parseFloat(point.lng))}));

		DirectionsHelper.getRoutesAPI(waypoints).then(
			(result) => this.setState({
				directions: result
			})
		);
	}

	setRoutes({rotas}) {
		this.setState({
			routes: rotas
		});
	}

	changeRoute(routes) {
		const promises = [];
		promises.push(
			new Promise((resolve, reject) => {
				routes.forEach((route) => {
					RotasService.findRouteById(route.id)
								.then(result => resolve(result))
								.catch(error => reject(error));
				});
			})
		);
		
		Promise.all(promises).then(
			(directions) => {
				directions.forEach((direction) => {
					DirectionsHelper.getRouteAPI(direction.rota.points.map((point) => ({location: new window.google.maps.LatLng(point.lat, point.lng)}) ) ).then(
							result => {
								const { directions } = this.state;
								
								result.id = direction.rota.id;

								directions.push(result);

								return this.setState({
									selectedRoute: routes,
									directions: directions 	
								});
							} 
						);
				});
			}
		);
		
	}

	render() {
		const { directions, selectedRoute, routes} = this.state;

		return (
			<div>
				<GridContainer>
					<GridItem xs={12} sm={12} md={4} />
					<GridItem xs={12} sm={12} md={4}>
						<Select options={routes}
								value={selectedRoute}
								onChange={this.changeRoute}
								noOptionsMessage={"Não há rotas disponíveis !"} />
					</GridItem>
					<GridItem xs={12} sm={12} md={4} />
					<GridItem xs={12} sm={12} md={12}>
						<Map arrDirections={directions} />
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}

export default ListarRotas;
