import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";

//import Navigation from "./Navigation";

//import "./Home.css";
import "./Loginmaintest.css";

const Signup = ({ onAdd }) => {
	const [ username, setUsername ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ passwordShown, setPasswordShown ] = useState();

	//const navigate = useNavigate();


	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};


	/*const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await (await fetch("http://localhost:3100/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		})).json();

		if(!result.error) {
			console.log(result);
			setUsername("");
			setEmail("");
			setPassword("");
			navigate("/Loginmain");
			//window.location.reload();
		} else {
			console.log(result.error);
		}
	};*/

	const handleSubmit = (e) => {
		e.preventDefault();
		onAdd({ username, email, password });

		setUsername("");
		setEmail("");
		setPassword("");
	};


  return (
    <main className="inner-container" role="main">
				<div className="header">Register</div>
				<form className="box" onSubmit={ handleSubmit } >
                    <div className="input-group">
						<label htmlFor='username' className="login-label" >Username</label>
						<input type="text" id='username' placeholder='Username' className="login-input" onChange={(e) => setUsername(e.target.value)} />
					</div>
                    <div className="input-group">
						<label htmlFor='email' className="login-label" >E-mail</label>
						<input type="email" id='email' placeholder='email' className="login-input" onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="input-group">
						<label htmlFor='password' className="login-label" >Password</label>
						<input type={ passwordShown ? "text" : "password" } id='password' placeholder='Password' className="login-input" onChange={(e) => setPassword(e.target.value)} />
						<p aria-hidden="true" onClick={ togglePassword } className="showpass">Show Password</p>
					</div>
						<button className="login-btn" type="submit">Sign Up</button>
					</form>
		</main>
  );
};

// ### Copy of the main file to be able to change it back ###

/*return (
    <main className="main" role="main">
		<Navigation />
			<div>
				<h1>TheNerds APP</h1>
				<form onSubmit={ handleSubmit } >
                    <div>
						<label htmlFor='username' className="formLabel">Username</label>
						<input type="text" id='username' placeholder='Username' className="formInput" onChange={(e) => setUsername(e.target.value)} />
					</div>
                    <div>
						<label htmlFor='email' className="formLabel">E-mail</label>
						<input type="email" id='username' placeholder='email' className="formInput" onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div>
						<label htmlFor='password' className="formLabel">Password</label>
						<input type="password" id='password' placeholder='Password' className="formInput" onChange={(e) => setPassword(e.target.value)} />
					</div>
						<button type="submit">Sign Up</button>
					</form>
			</div>
		</main>
  );
};*/

//<Link to="/"><button>Sign Up</button></Link>
export default Signup;