import { configureStore } from "@reduxjs/toolkit";

const person = {
	email: "",
	userName: "",
	userId: undefined,
};

function LoginReducer(state = person, action) {
	if ((action.type === "login")) {
		return {
			email: action.payload.email,
			userName: action.payload.userName,
			userId: action.payload.userId,
		};
	} else {
		return state;
	}
}

const store = configureStore({ reducer: LoginReducer, preloadedState: person });
// The store now has redux-thunk added and the Redux DevTools Extension is turned on
export default store;
