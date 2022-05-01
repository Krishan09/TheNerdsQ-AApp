import React, { useState } from "react";

import Login from "./Login";
import Signup from "./Signup";
import Navigation from "./Navigation";
import Footer from "./Footer";

import { useNavigate } from "react-router-dom";

//import "./Loginmain.css";
import "./Loginmaintest.css";


const Loginmain = ({ setToken }) => {
    /*const logout = () => {
      window.localStorage.clear();
      navigate("/");
    };*/
    const [ loginOpen, setLoginOpen ] = useState(true);
    const [ registerOpen, setRegisterOpen ] = useState(false);

    //const navigate = useNavigate();

    const api = process.env.API_URL || "/api";

    async function loginUser(credentials) {
      //return fetch("http://localhost:3100/api/login", {
        return fetch(`${ api }/login`, { //possible workout for the heroku fetch("/api/login")
        //return fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
      .then((data)=> data.json())
      .then((data)=> {
         console.log(data);
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

    const navigate = useNavigate();

    const signup = async ({ username, email, password }) => {
      //const result = await(await fetch("http://localhost:3100/api/register", {
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
      //body: JSON.stringify(item),
		})).json();

    if(!result.error) {
			console.log(result);
			navigate("/Loginmain");
			//window.location.reload();
		} else {
			console.log(result.error);
		}
    };


    /*const onMouse = () => {
     this.{ backgroundColor: "red" };
    };*/

    return (
      <main className="upmain">
        <Navigation />
      <div className="root-container">
        <div className="box-controller">
          <div aria-hidden="true" className={"controller " + (loginOpen ? "selected-controller" : "")} role="menuitem" onClick={ showLoginBox }  >
            Login
          </div>
          <div aria-hidden="true" className={"controller " + (registerOpen ? "selected-controller" : "")} role="menuitem" onClick={ showRegisterBox } >
            Register
            </div>
        </div>
        <div className="box-container">
          { loginOpen ? <Login setToken={ setToken } loginUser={ loginUser } /> : registerOpen ? <Signup onAdd={ signup } /> : null }
      </div>
      </div>
        <Footer  />
      </main>
    );
};

    /*return (
          <main className="main" role="main">
                  <Login />
                  <Signup />
          </main>
      );
  };*/

  export default Loginmain;