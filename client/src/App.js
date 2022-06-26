import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Main from "./pages/Main";
import Loginmain from "./pages/Loginmain";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authenticateUser } from "./auth";



const App = () => {
	const dispatch = useDispatch();
	const { userId } = useSelector((state) => state);

	useEffect(() => {
		if(!userId){
			authenticateUser(dispatch);
		}
	},[userId, dispatch]);

	return (
				<Routes>
					<Route path="/" element={<Main />} />
					<Route
						path="/Loginmain"
						element={<Loginmain />}
					/>
					<Route path="/about/this/site" element={<About />} />
				</Routes>
	);
};
export default App;
