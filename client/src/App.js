import React from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import About from "./pages/About";
import Main from "./pages/Main";
import Loginmain from "./pages/Loginmain";


const App = () => {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route
						path="/Loginmain"
						element={<Loginmain />}
					/>
					<Route path="/about/this/site" element={<About />} />
				</Routes>
			</Provider>
		</React.StrictMode>
	);
};
export default App;
