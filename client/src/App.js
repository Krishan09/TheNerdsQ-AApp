import { Route, Routes } from "react-router-dom";
import React /*{ useState }*/ from "react";

//import Login from "./pages/Login";
import About from "./pages/About";
//import Home from "./pages/Home";
import Main from "./pages/Main";
//import Signup from "./pages/Signup";
import Loginmain from "./pages/Loginmain";
import useToken from "./components/useToken";


/*function setToken(userToken) {
	sessionStorage.setItem("token", JSON.stringify(userToken));
}
function getToken() {
	const tokenString = sessionStorage.getItem("token");
	const userToken = JSON.parse(tokenString);
	return userToken?.token;
}*/

const App = () => {

	/* ## do not delete this part ## */


	const { token, setToken } = useToken();
	//const [token, setToken] = useState();
	//const token = getToken();

	//setToken(token);

	/*if(!token) {
		return <Login setToken={setToken} />;
	}*/

	/* ## do not delete or update the part above ## */

	return (
		<React.StrictMode>
			<Routes>
				<Route path="/" element={<Main />} />
				{/*<Route path="/Login" element={<Login />} />

	<Route path="/Signup" element={<Signup />} />*/}
				<Route path="/Loginmain" element={<Loginmain setToken={setToken} />} />
				<Route path="/about/this/site" element={<About />} />
			</Routes>
		</React.StrictMode>
	);
};
//<Route path="/" element={<Home />} />
export default App;
