import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import LogoNerds from "./LogoNerds.png";
import useToken from "../components/useToken";
import { useSelector } from "react-redux";

const Navigation = () => {
	const [logName, setLogName] = useState(false);
	const { token } = useToken();
	console.log(token);
  const { email,userName } = useSelector((state) => state);

	const logout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};


	return (
		<div className="navigation">
			<img className="logomain" src={LogoNerds} alt="Logo" />
			<ul>
				<li>{email}</li>
				{token ? (
					<button className="logout-button" onClick={logout}>
						Logout
					</button>
				) : logName ? (
					<li>
						<Link onClick={() => setLogName(!logName)} to="/">
							Home
						</Link>
					</li>
				) : (
					<li>
						<Link onClick={() => setLogName(!logName)} to="/Loginmain">
							Login/Register
						</Link>
					</li>
				)}
			</ul>
		</div>
	);
};

export default Navigation;
