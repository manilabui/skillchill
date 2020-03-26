import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "tachyons";
import ApplicationViews from "./components/ApplicationViews";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
	<Router>
		<ApplicationViews />
	</Router>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
