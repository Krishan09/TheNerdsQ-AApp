import React, { useState } from "react";
import store from "../store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Loginmaintest.css";

export function Login({ loginUser, setToken }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordShown, setPasswordShown] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userName);

	const navigate = useNavigate();

	console.log(loginUser);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({
			type: "login",
			payload: { email: email, userName: "123@gmail.com", userId: 2 },
		});
		console.log(user);
		setEmail("");
		setPassword("");
		navigate("/");
	};

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	return (
		<main className="inner-container">
			<div className="header">Login</div>
			<form className="box" onSubmit={handleSubmit}>
				<div className="input-group">
					<label htmlFor="email" className="login-label">
						Username
					</label>
					<input
						value={email}
						type="email"
						id="email"
						placeholder="Email"
						className="login-input"
						onChange={(e) => setEmail(e.target.value)}
						autoComplete="off"
					/>
				</div>
				<div className="input-group">
					<label htmlFor="password" className="login-label">
						Password
					</label>
					<input
						value={password}
						type={passwordShown ? "text" : "password"}
						id="password"
						placeholder="Password"
						className="login-input"
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="off"
					/>
				</div>
				<p aria-hidden="true" onClick={togglePassword} className="showPass">
					Show Password
				</p>
				<div>
					<button className="btn login-btn" type="submit">
						Submit
					</button>
				</div>
			</form>
		</main>
	);
}
export default Login;
