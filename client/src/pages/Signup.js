import React, { useState } from "react";
import "./loginMain.css";

const Signup = ({ onAdd }) => {
	const [ username, setUsername ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ passwordShown, setPasswordShown ] = useState();

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onAdd({ username, email, password });
		console.log(username, email, password);

		setUsername("");
		setEmail("");
		setPassword("");
	};


  return (
		<main className="inner-container" role="main">
			<div className="header">Register</div>
			<form className="box" onSubmit={handleSubmit}>
				<div className="input-group">
					<label htmlFor="username" className="login-label">
						Username
					</label>
					<input
						type="text"
						id="username"
						placeholder="Username"
						className="login-input"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
						autoComplete="off"
					/>
				</div>
				<div className="input-group">
					<label htmlFor="email" className="login-label">
						E-mail
					</label>
					<input
						type="email"
						id="email"
						placeholder="Email"
						className="login-input"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						autoComplete="off"
					/>
				</div>
				<div className="input-group">
					<label htmlFor="password" className="login-label">
						Password
					</label>
					<input
						type={passwordShown ? "text" : "password"}
						id="password"
						placeholder="Password"
						className="login-input"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						autoComplete="off"
					/>
				</div>
				<p aria-hidden="true" onClick={togglePassword} className="showPass">
					Show Password
				</p>
				<button className="btn login-btn" type="submit">
					Sign Up
				</button>
			</form>
		</main>
	);
};

export default Signup;