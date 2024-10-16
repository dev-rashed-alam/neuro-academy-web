import React, { useContext } from "react";
import "./assets/styles/App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Login from "./components/Modules/Login/Login";
import LoaderComponent from "./components/CommonComponents/Loader/Loader";
import { FormContext } from "./components/Context/FormContext";
import Notification from "./components/CommonComponents/Notification";

const App = () => {
  const { loader } = useContext(FormContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/*" component={ProtectedRoute} />
        </Switch>
      </BrowserRouter>
      <LoaderComponent showLoader={loader} />
      <Notification />
    </div>
  );
};

export default App;
