import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import FormContextProvider from "./components/Context/FormContext";

ReactDOM.render(
  <BrowserRouter>
    <FormContextProvider>
      <App />
    </FormContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
