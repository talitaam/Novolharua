import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Select from "components/Select/Select.jsx";
import Map from "components/Map/Map.jsx";

class ListarUsuario extends React.Component {
	constructor(props) {
		super();
		this.state = {
			name: "",
			email: "",
			obs: ""
		};
	}

	render() {
		const { directions, selectedRoute, routes} = this.state;

		return (
			<div>
				<GridContainer>
					<GridItem xs={12} sm={12} md={4} />
					<GridItem xs={12} sm={12} md={4}>
					</GridItem>
					<GridItem xs={12} sm={12} md={4} />
					<GridItem xs={12} sm={12} md={12}>
					</GridItem>
				</GridContainer>
			</div>
		);
	}
}

export default ListarUsuario;
