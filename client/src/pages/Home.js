//import { useEffect, useState } from "react";
//import { render } from "react-dom";
//import { Link } from "react-router-dom";

//import "./Home.css";
//import logo from "./logo.svg";



/* #### IMPORTANT MESSAGE: Please do not delete or update this module #### */



// export function Home() {
	/*const [message, setMessage] = useState("Loading...");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

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
	}, []);

	useEffect(() => {
		fetch("api/questions")
		  .then((res) => res.json())
		  .then((data) => setQuestions(data))
		  .catch((err) => console.error(err));
	  }, []);
	  useEffect(() => {
		fetch("api/answers")
		  .then((res) => res.json())
		  .then((data) => setAnswers(data))
		  .catch((err) => console.error(err));
	  }, []);
	  console.log(questions);
	  console.log(answers);*/


	// return (
	// 	<main className="main" role="main">
	// 		<div>
	// 			{/* <h1>TheNerds Q&A APP</h1> */}
	// 			<form>
	// 				<div>
	// 					<label htmlFor='username' className="formLabel">Username</label>
	// 					<input type="text" id='username' placeholder='Username' className="formInput" />
	// 				</div>
	// 				<div>
	// 					<label htmlFor='password' className="formLabel">Password</label>
	// 					<input type="password" id='password' placeholder='Password' className="formInput" />
	// 				</div>
	// 				</form>
	// 			<Link to="/Main"><button>Login</button></Link><Link to="/Signup"><button>Sign Up</button></Link>
	// 		</div>
	// 	</main>
	// );
//}

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

//export default Home;
