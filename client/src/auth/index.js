import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

export const getToken = async () => {
    const token = await Cookies.get("token_id");
    if(token){
       return token;
    }
    return null;
};

export const logoutUser = async () => {
	await Cookies.remove("token_id");
	window.location.reload();
};

export const getUser = async () => {
    const token = await getToken();
    const user = decodeToken(token);
    return user;
};

export const authenticateUser = async (dispatch) => {
	const user = await getUser();
	dispatch({
		type: "login",
		payload: {
			email: user.email,
			userName: user.username,
			userId: user.userId,
		},
	});
};