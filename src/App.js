import React, { Component } from "react";
import "./assets/styles/App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Login from "./components/Modules/Login/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/*" component={ProtectedRoute} />
        </Switch>
      </Router>
    );
  }
}

export default App;
