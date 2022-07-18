import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import LogoNerds from "./LogoNerds.png";
import { useSelector } from "react-redux";
import { logoutUser } from "../auth/index";
import HambugerImg from "./Hamburger_icon.png";


const Navigation = () => {
	const { userName } = useSelector((state) => state);
	const [open, setOpen] = useState(false);

	return (
		<div className={open ? "topnav responsive" : "topnav"} id="myTopnav">
			<a href="/" className="active nav-logo">
				<img className="logo" src={LogoNerds} alt="Logo" />
			</a>
			<a href="/" className="topnav-item">
				Home
			</a>
			{userName && (
				<a className="topnav-item" href="/ask-question">
					Ask question
				</a>
			)}
			{!userName && (
				<a className="topnav-item" href="/Loginmain">
					Login/Register
				</a>
			)}
			{userName && (
				<a className="topnav-item" href="#about">
					You are logged in as: {userName}
				</a>
			)}
			{userName && (
				<a className="topnav-item">
					<span style={{ color: "red" }} onClick={logoutUser}>
						Logout
					</span>
				</a>
			)}
			<span className="topnav-item icon" onClick={() => setOpen(!open)}>
				<img src={HambugerImg} alt="Hambuger" width="30px" height="30px" />
			</span>
		</div>
	);
};

export default Navigation;
