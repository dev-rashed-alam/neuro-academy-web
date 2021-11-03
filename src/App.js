import React, {Component} from "react";
import "./assets/styles/App.scss";
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Login from "./components/Modules/Login/Login";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/*" component={ProtectedRoute}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
