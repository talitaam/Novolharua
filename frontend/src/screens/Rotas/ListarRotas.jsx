import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Select from "components/Select/Select.jsx";
import Map from "components/Map/Map.jsx";

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
		this.findRoutes();
	}

	fecthRoutes() {
		const fetchData = {
			method: "GET"
		};
		return fetch('http://localhost:3001/rota/', fetchData).then((res) => res.json());
	}

	fetchRouteById(id) {
		const fetchData = {
			method: "POST",
			body: JSON.stringify({ routeId: id })
		};
		return fetch('http://localhost:3001/rota/findById', fetchData).then((res) => res.json());
	}

	findRoutes() {
		return this.fecthRoutes()
			.then(json => {
				this.setRoutes(json);
			});
	}

	findRouteById(id) {
		this.fetchRouteById(id).then(this.setDirection);
	}	

	setDirection({rota}) {
		const { google } = window;
		const waypoints = rota.points
							.map((point) => ({location: new google.maps.LatLng(parseFloat(point.lat), parseFloat(point.lng))}));

        if (!waypoints.length || waypoints.length < 2) {
            alert('Pontos insuficientes para calcular uma rota ! É preciso de no mínimo 2 !');
        } else {
            const waypointsAux = waypoints.slice(0);
			const origin = waypointsAux.shift();
			const destination = waypointsAux.pop();

            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: origin,
                destination: destination,
                waypoints: waypointsAux,
                travelMode: google.maps.TravelMode['WALKING'],
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
					this.setState({
						directions: result
                    });
                } else {
                    alert(`Erro ao buscar rota : ${result}`);
                }
            });
		}
	}

	setRoutes({rotas}) {
		this.setState({
			routes: rotas
		});
	}

	changeRoute(route) {
		this.findRouteById(route.id);
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
