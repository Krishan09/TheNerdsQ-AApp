import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./loginMain.css";

export function Login({ loginUser }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordShown, setPasswordShown] = useState(false);
	const user = useSelector((state) => state.userName);

	console.log(loginUser);

	const handleSubmit = async (e) => {
		e.preventDefault();
		loginUser(email, password);
		console.log(user);
		setEmail("");
		setPassword("");
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
						Email
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
