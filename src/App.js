import React, { Component } from "react";
import "./assets/styles/App.scss";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/Route/ProtectedRoute";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ProtectedRoute} />
      </Switch>
    );
  }
}

export default App;
