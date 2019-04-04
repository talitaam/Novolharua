import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Doador from "layouts/Doador.jsx";
import Admin from "layouts/Admin.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/doador" component={Doador} />
      <Route path="/test" component={Admin} />
      <Redirect from="/" to="/doador/user" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
