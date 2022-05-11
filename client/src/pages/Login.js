import React, { useState } from "react";
//import { useEffect, useState } from "react";
//import { render } from "react-dom";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
//import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";

//import "./Home.css";
import "./Loginmaintest.css";
//import logo from "./logo.svg";

/*async function loginUser(credentials) {
	return fetch("http://localhost:3100/api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	})
	.then((data)=> data.json());
}*/

/*console.log(loginUser);*/
//"access-control-allow-origin": "*",

export function Login({ loginUser, setToken }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [ passwordShown, setPasswordShown ] = useState(false);

	const navigate = useNavigate();

	console.log(loginUser);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = await loginUser({
			email,
			password,
		});
		console.log(token);
		setToken(token);
		setEmail("");
		setPassword("");
		navigate("/");
		//window.location.reload();
	};

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};


	//console.log(token);

	/*const [message, setMessage] = useState("Loading...");

	useEffect(() => {
		fetch("/api")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessage(body.message);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);*/
	return (
		<main className="inner-container" >
			{/*<div><Navigation /></div>
			<div>
	<h1>TheNerds Q&A APP Login page</h1>*/}
					<div className="header" >
						Login
					</div>
				<form className="box" onSubmit={handleSubmit}>
					<div className="input-group">
						<label htmlFor='email' className="login-label" >Username</label>
						<input value={email} type="email" id='email' placeholder='Email' className="login-input" onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="input-group">
						<label htmlFor='password' className="login-label">Password</label>
						<input value={password} type={ passwordShown ? "text" : "password" } id='password' placeholder='Password' className="login-input" onChange={(e) => setPassword(e.target.value)} />
						<p aria-hidden="true" onClick={ togglePassword } className="showpass">Show Password</p>
					</div>
                    <div>
                        <button className="login-btn" type="submit">Submit</button>
                    </div>
					</form>
			{/*</div>*/}
		</main>
	);
}

// ### copy of the main file to be able to change it back ###

/*return (
	<main className="main" role="main">
		{/*<div><Navigation /></div>
		<div>
<h1>TheNerds Q&A APP Login page</h1>*//*}
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='email' className="formLabel">Username</label>
					<input type="email" id='email' placeholder='Email' className="formInput" onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<label htmlFor='password' className="formLabel">Password</label>
					<input type="password" id='password' placeholder='Password' className="formInput" onChange={(e) => setPassword(e.target.value)} />
				</div>
				<div>
					<button type="submit">Submit</button>
				</div>
				</form>

		{/*</div>*//*}
	</main>
);
}*/


//<Link to="/Signup"><button>Sign Up</button></Link>
/*Login.propTypes = {
	setToken: PropTypes.func.isRequired,
};*/

//<Link to="/Main"><button>Login</button></Link>

/*<img
					className="logo"
					data-qa="logo"
					src={logo}
					alt="Just the React logo"
				/>
				<h1 className="message" data-qa="message">
					{message}
				</h1>
				<Link to="/about/this/site">About</Link>*/

export default Login;