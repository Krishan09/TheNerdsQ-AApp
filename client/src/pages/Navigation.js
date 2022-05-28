import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import LogoNerds from "./LogoNerds.png";
import { useSelector } from "react-redux";

const Navigation = () => {
	const [logName, setLogName] = useState(false);

  const { email } = useSelector((state) => state);

	// const logout = () => {
	// 	localStorage.removeItem("token");
	// 	window.location.reload();
	// };


	return (
		<div className="navigation">
			<img className="logo" src={LogoNerds} alt="Logo" />
			<ul className="loginWrapper">
				<li className="loginStyle">Logged as:{email}</li>
				{email ? (
					<span></span>
				) : (
					<li className="loginStyle">
						<Link onClick={() => setLogName(!logName)} to="/Loginmain">
							<button className="btn bg-light ml-3">Login/Register</button>
						</Link>
					</li>
				)}
			</ul>
		</div>
	);
};

export default Navigation;
