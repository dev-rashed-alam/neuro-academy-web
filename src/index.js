import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import {HashRouter} from "react-router-dom";
import FormContextProvider from "./components/Context/FormContext";

axios.interceptors.request.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error)
})

ReactDOM.render(
    <HashRouter>
        <FormContextProvider>
            <App/>
        </FormContextProvider>
    </HashRouter>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
