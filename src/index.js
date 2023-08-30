import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";
import FormContextProvider from "./components/Context/FormContext";

ReactDOM.render(
  <HashRouter>
    <FormContextProvider>
      <App />
    </FormContextProvider>
  </HashRouter>,
  document.getElementById("root")
);
