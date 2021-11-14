import React, {useContext} from "react";
import "./assets/styles/App.scss";
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Login from "./components/Modules/Login/Login";
import LoaderComponent from "./components/CommonComponents/Loader/Loader";
import {FormContext} from "./components/Context/FormContext";

const App = () => {

    const {loader} = useContext(FormContext)

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/*" component={ProtectedRoute}/>
                </Switch>
            </Router>
            <LoaderComponent showLoader={loader}/>
        </div>
    );
}

export default App;
