import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Select from "components/Select/Select.jsx";
import Map from "components/Map/Map.jsx";

import moment from "moment";

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

class Maps extends React.Component {
	constructor(props) {
		super();
		this.state = {
			maps: [],
			rota: "",
			rotas: []
		};

		this.changeRoute = this.changeRoute.bind(this);
	}

	componentDidMount() {
		this.buscarRotas();
	}

	fetchRotas() {
		let date = moment("31/12/2069");
		const fetchData = {
			method: "POST",
			body: JSON.stringify({ 'data': moment(date).format('YYYY-MM-DD') })
		};
		return fetch('http://localhost:3001/rota/', fetchData).then((res) => res.json());
	}

	buscarRotas() {
		return  this.fetchRotas()
					.then(json => {
						this.updateState(json);
					});
	}

	updateState(res) {
		const rotas = Object.values(res.rotas);
		const canAutoSetOption = rotas.length > 0;

		let rota,
			maps;

		if (canAutoSetOption) {
			rota = rotas[0];
			maps = mapsPlaces.filter(map => map.id === rotas[0].value);
		} else {
			rota = "";
			maps = [];
		}

		this.setState({
			rota: rota,
			rotas: rotas,
			maps: maps
		});
	}

	changeRoute(route) {
		const map = mapsPlaces.filter(map => map.id === route.value);

		this.setState({
			rota: route,
			maps: map
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
		return (
			<div>
				<GridContainer>
					<GridItem xs={12} sm={12} md={4} />
					<GridItem xs={12} sm={12} md={4}>
						<Select options={this.state.rotas}
							value={this.state.rota}
							onChange={this.changeRoute}
							placeholder={"Selecione :"}
							noOptionsMessage={() => "Não há rotas disponíveis !"} />
					</GridItem>
					<GridItem xs={12} sm={12} md={4} />
					<GridItem xs={12} sm={12} md={12}>
						{this.state.maps.map((mapObject, index) => this.renderMap(mapObject, index))}
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}

export default Maps;
