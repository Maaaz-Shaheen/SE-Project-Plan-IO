import firebase from "firebase";

const config = {
	apiKey: "AIzaSyAWeZDGGLwgk4m1GEsRgEnY123pRp3gwMc",
	authDomain: "planio-14141.firebaseapp.com",
	databaseURL: "https://planio-14141-default-rtdb.firebaseio.com",
	projectId: "planio-14141",
	storageBucket: "planio-14141.appspot.com",
	messagingSenderId: "1083687797472",
	appId: "1:1083687797472:web:fb2001e1813ef26b524685",
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
