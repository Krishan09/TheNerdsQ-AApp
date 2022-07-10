import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import LogoNerds from "./LogoNerds.png";
import { useSelector } from "react-redux";
import { logoutUser } from "../auth/index";

const Navigation = () => {
	const [logName, setLogName] = useState(false);

	const { userName } = useSelector((state) => state);


	return (
		<div className="navigation">
			<img className="logo" src={LogoNerds} alt="Logo" />
			<ul className="navigation-list">
				<li className="navigation-list-item">
					<Link to="/">Home</Link>
				</li>
				{userName ? (
					<>
						<li className="navigation-list-item">
							You are logged in as: {userName}
						</li>
						<li className="navigation-list-item">
							<Link className="ask-btn btn" to="/ask-question">
								Ask Question
							</Link>
						</li>
						<li>
							<button
								className="ask-btn btn navigation-list-item"
								onClick={logoutUser}
							>
								Logout
							</button>
						</li>
					</>
				) : (
					<li className="navigation-list-item">
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
