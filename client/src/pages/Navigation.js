import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import LogoNerds from "./LogoNerds.png";
import useToken from "../components/useToken";
//import { database } from "pg/lib/defaults";
//import jwt from "jwt";



const Navigation = () => {
const [ logName, setLogName ] = useState(false);
const { token } = useToken();
console.log(token);

/*const removeToken = (userToken) => {
    const removeToken = (userToken) => {
    localStorage.removeItem("token", JSON.stringify(userToken));
    setToken(false);
    return {
        setToken: removeToken, token,
    };
};
};*/

const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
};

/*const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user.username"));
};*/

//const decoded = jwt.decode(token);
//console.log(decoded);

    return (
    <div className="navigation">
        <img className="logomain" src={LogoNerds} alt="Logo" />
        {/*<div className="logo">The Nerds</div>*/}
        <ul>
            <li>Logged as: { token ? "Roman" : "Guest" }</li>
            { token ? <button className="logout-button" onClick={ logout }>Logout</button> : ( logName ? (<li><Link onClick={() => setLogName(!logName) } to="/" >Home</Link></li>) :
           (<li><Link onClick={() => setLogName(!logName) } to="/Loginmain">Login/Register</Link></li>) )
    }
        </ul>
 </div>
    );
};

//(!logName)
/*<li><Link to="/Login">Login</Link></li>
            <li><Link to="/Signup">Register</Link></li>*/
export default Navigation;