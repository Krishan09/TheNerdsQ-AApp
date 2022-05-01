import { useState } from "react";



/*const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
};

const [ token, setToken ] = useState(getToken);*/

function useToken() {
    //commented out just for the use of removeToken
    const getToken = () => {
        const tokenString = localStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        return userToken?.token;
    };
    const [token, setToken] = useState(getToken()); //commented out for the removeToken

    const saveToken = (userToken) => {
        localStorage.setItem("token", JSON.stringify(userToken));
        setToken(userToken.token);
    };

    /*const removeToken = (userToken) => {
        localStorage.removeItem("token", JSON.stringify(userToken));
        setToken(false);
        return {
            setToken: removeToken, token,
        };
    };*/

    return {
        setToken: saveToken,
        token,
    };
}

//const removeToken = (userToken) => {
    /*const removeToken = (userToken) => {
    localStorage.removeItem("token", JSON.stringify(userToken));
    setToken(false);
    return {
        setToken: removeToken, token,
    };
};*/

export default useToken;
//module.exports = { useToken, removeToken };