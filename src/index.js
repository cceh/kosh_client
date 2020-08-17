import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from 'react-router-dom'

const rootElement = document.getElementById("root");
ReactDOM.render(<Router basename={process.env.PUBLIC_URL}>
    <App/>
</Router>, rootElement);
