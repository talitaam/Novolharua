import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Select from "components/Select/Select.jsx";
import Direction from "components/Direction/Direction.jsx";

class ListarRotas extends React.Component {
	constructor(props) {
		super();
		this.state = {
			directions: [],
			actualRoute: "",
			routes: []
		};

		this.changeRoute = this.changeRoute.bind(this);
		this.setRoutes = this.setRoutes.bind(this);
	}

	componentDidMount() {
		this.buscarRotas();
	}

	fetchRotas() {
		const fetchData = {
			method: "GET"
		};
		return fetch('http://localhost:3001/rota/', fetchData).then((res) => res.json());
	}

	buscarRotas() {
		return this.fetchRotas()
			.then(json => {
				this.setRoutes(json);
			});
	}

	setRoutes({routes}) {
		this.setState({
			routes
		});
	}

	changeRoute(route) {
		this.setState({
			rota: route
		});
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
							noOptionsMessage={"Não há rotas disponíveis !"} />
					</GridItem>
					<GridItem xs={12} sm={12} md={4} />
					<GridItem xs={12} sm={12} md={12}>
						<Direction />
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}

export default ListarRotas;
