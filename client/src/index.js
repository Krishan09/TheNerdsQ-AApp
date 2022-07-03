import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Footer from "./pages/Footer";
import Navigation from "./pages/Navigation";

import App from "./App";

ReactDOM.render(
	<BrowserRouter>
		<React.StrictMode>
			<Provider store={store}>
				<div className="main-container">
					<Navigation />
					<div className="container">
						<App />
					</div>
					<Footer />
				</div>
			</Provider>
		</React.StrictMode>
	</BrowserRouter>,
	document.getElementById("root")
);
