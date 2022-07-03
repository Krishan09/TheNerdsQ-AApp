import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import LogoNerds from "./LogoNerds.png";
import { useSelector } from "react-redux";

const Navigation = ({ handleShow }) => {
	const [logName, setLogName] = useState(false);

	const { userName } = useSelector((state) => state);

	// const logout = () => {
	// 	localStorage.removeItem("token");
	// 	window.location.reload();
	// };

	return (
		<div className="navigation">
			<img className="logo" src={LogoNerds} alt="Logo" />
			<ul className="loginWrapper">
				{userName ? (
					<>
						<li className="loginStyle">Logged in as:{userName}</li>
						<li className="loginStyle">
							<button className="ask-btn btn" onClick={handleShow}>
								Ask Question
							</button>
						</li>
					</>
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
