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
			directions: {
				routes:[]
			},
			selectedRoute: "",
			routes: []
		};

		this.changeRoute = this.changeRoute.bind(this);
		this.setRoutes = this.setRoutes.bind(this);
		this.setDirection = this.setDirection.bind(this);
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

		DirectionsHelper.getRouteAPI(waypoints).then(
			result => this.setState({ directions: result })
		);
	}

	setRoutes({rotas}) {
		this.setState({
			routes: rotas
		});
	}

	changeRoute(route) {
		RotasService.findRouteById(route.id).then(this.setDirection);
		this.setState({
			selectedRoute: route
		});
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
						<Map directions={directions} />
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}

export default ListarRotas;
