import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "./Loginmain.css";
import { useDispatch } from "react-redux";



const Loginmain = ({ setToken }) => {
    const [ loginOpen, setLoginOpen ] = useState(true);
    const [ registerOpen, setRegisterOpen ] = useState(false);
    const api = "/api";

  const dispatch = useDispatch();
  const navigate = useNavigate();


    async function loginUser(email,password) {
        return fetch(`${ api }/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,password }),
      })
      .then((data)=> {
		if (data.ok) {
				return data.json();
			}
			throw new Error("can't logging");
		})
      .then((data)=> {
		dispatch({
			type: "login",
			payload: { email: data.email, userName: data.userName, userId: data.userId },
		});
		navigate("/");
        return data;
    } );
    }



    const showLoginBox = () => {
      setLoginOpen(true);
      setRegisterOpen(false);
    };

    const showRegisterBox = () => {
      setLoginOpen(false);
      setRegisterOpen(true);
    };

    const signup = async ({ username, email, password }) => {
        const result = await(await fetch(`${ api }/register`, {
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
			navigate("/Loginmain");
		} else {
			console.log(result.error);
		}
    };
    return (
			<main className="upmain">
				<Navigation />
				<div className="root-container">
					<div className="box-controller">
						<div
							aria-hidden="true"
							className={
								"controller " + (loginOpen ? "selected-controller" : "")
							}
							role="menuitem"
							onClick={showLoginBox}
						>
							Login
						</div>
						<div
							aria-hidden="true"
							className={
								"controller " + (registerOpen ? "selected-controller" : "")
							}
							role="menuitem"
							onClick={showRegisterBox}
						>
							Register
						</div>
					</div>
					<div className="box-container">
						{loginOpen ? (
							<Login setToken={setToken} loginUser={loginUser} />
						) : registerOpen ? (
							<Signup onAdd={signup} />
						) : null}
					</div>
				</div>
				<Footer />
			</main>
		);
};
export default Loginmain;