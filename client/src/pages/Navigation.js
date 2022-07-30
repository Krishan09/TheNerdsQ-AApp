import React, { useState } from "react";
import "./Navigation.css";
import LogoNerds from "./LogoNerds.png";
import { useSelector } from "react-redux";
import { logoutUser } from "../auth/index";
import HamburgerImg from "./Hamburger_icon.png";


const Navigation = () => {
	const { userName } = useSelector((state) => state);
	const [open, setOpen] = useState(false);

	return (
		<div className={open ? "topNav responsive" : "topNav"}>
			<a href="/" className="active nav-logo">
				<img className="logo" src={LogoNerds} alt="Logo" />
			</a>
			{userName && (
				<a href="/" className="topNav-item tent fufuf">
					<span onClick={logoutUser} aria-hidden="true">
						Logout
					</span>
				</a>
			)}
			{userName && (
				<a className="topNav-item" href="/ask-question">
					Ask question
				</a>
			)}
			{userName && (
				<a className="topNav-item" href="/">
					You are logged in as: {userName}
				</a>
			)}
			{!userName && (
				<a className="topNav-item tent" href="/LoginMain">
					Login/Register
				</a>
			)}
			<a href="/" className="topNav-item">
				Home
			</a>
			<span
				className="topNav-item icon"
				onClick={() => setOpen(!open)}
				aria-hidden="true"
			>
				<img src={HamburgerImg} alt="Hamburger" width="30px" height="30px" />
			</span>
		</div>
	);
};

export default Navigation;
