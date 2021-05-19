import { firebase, googleAuthProvider } from "../firebase/firebase";

export const startLoginWithGoogle = () => {
	return () => {
		return firebase.auth().signInWithPopup(googleAuthProvider);
	};
};

export const startSignupWithEmailAndPassword = (email, password) => {
	return () => {
		return firebase.auth().createUserWithEmailAndPassword(email, password);
	};
};

export const startLoginWithEmailAndPassword = (email, password) => {
	console.log(email);
	return () => {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	};
};

export const startLogout = () => {
	return () => {
		return firebase.auth().signOut();
	};
};

export const login = (uid) => {
	return {
		type: "LOGIN",
		uid,
	};
};

export const logout = () => {
	return {
		type: "LOGOUT",
	};
};
