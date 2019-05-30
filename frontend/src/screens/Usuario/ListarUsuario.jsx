import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import UserService from "./UserService";

class ListarUsuario extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      email: "",
      doc: "",
      telefoneFixo: "",
      telefoneCelular: "",
      obs: ""
    };
  }

  componentDidMount() {
    UserService.findUsers().then(json => {
      this.setState({
        name: name,
        email: email,
        doc: doc,
        telefoneFixo: telefoneFixo,
        telefoneCelular: telefoneCelular,
        obs: obs
      });
    });
  }

  render() {
    const { directions, selectedRoute, routes } = this.state;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4} />
          <GridItem xs={12} sm={12} md={4} />
          <GridItem xs={12} sm={12} md={4} />
          <GridItem xs={12} sm={12} md={12} />
        </GridContainer>
      </div>
    );
  }
}

export default ListarUsuario;
