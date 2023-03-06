import bodyParser from "body-parser";
import { ChatGPTAPI } from "chatgpt";
import cors from "cors";
import env from "dotenv";
import express from "express";
import fetch from "node-fetch";

// / Import the functions you need from the SDKs you need
// import mqtt from "mqtt";
// const { initializeApp } = mqtt.connect(
//   "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js"
// );
// const { getAnalytics } = mqtt.connect(
//   "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.j"
// );
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";

// import { initializeApp } from "@firebase/app";
// import { getAnalytics } from "firebase/analytics";
// const admin = require('firebase-admin');

// const firebaseConfig = {
// 	apiKey: "AIzaSyDvH4IEEc_pZn7yyhCAuxevGF8FswZC7oE",
// 	authDomain: "ef-flutter-app-a4bb3.firebaseapp.com",
// 	projectId: "ef-flutter-app-a4bb3",
// 	storageBucket: "ef-flutter-app-a4bb3.appspot.com",
// 	messagingSenderId: "433138187450",
// 	appId: "1:433138187450:web:731f49454ae40b72631683",
// 	measurementId: "G-MN64HG0LHN",
// };


import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDvH4IEEc_pZn7yyhCAuxevGF8FswZC7oE",
	authDomain: "ef-flutter-app-a4bb3.firebaseapp.com",
	projectId: "ef-flutter-app-a4bb3",
	storageBucket: "ef-flutter-app-a4bb3.appspot.com",
	messagingSenderId: "433138187450",
	appId: "1:433138187450:web:731f49454ae40b72631683",
	measurementId: "G-MN64HG0LHN"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// if (getAnalytics.isSupported()) {
// 	const analytics = getAnalytics(firebaseApp);
// 	const eventParams = {
// 		param1: 'value1',
// 		param2: 'value2',
// 	};

// 	analytics.logEvent('custom_event', eventParams);
// } else {
// 	console.log("Firebase Analytics is not supported in this environment");
// }

isSupported().then((isSupported) => {
	if (isSupported) {
		let analytics = firebase.analytics();
		const eventParams = {
			param1: 'value1',
			param2: 'value2',
		};

		analytics.logEvent('custom_event', eventParams);
	}
	else {
		console.log("Firebase Analytics is not supported in this environment");
	}
})

// Initialize Firebase
// const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebase);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
//  Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// initializeApp = require("firebase/app");
// import { getAnalytics } from "firebase/analytics";
// getAnalytics = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());

// Initialize ChatGPT
const chatgpt = new ChatGPTAPI({
	apiKey: process.env.API_KEY,
	fetch,
});

// dummy route to test
app.get("/", (req, res) => {
	res.send("Hello World!");
});

//post route for making requests
app.post("/", async (req, res) => {
	const { message } = req.body;
	try {
		let response;
		if (req.body.conversationId) {
			response = await chatgpt.sendMessage(message, {
				conversationId: req.body.conversationId,
				parentMessageId: req.body.lastMessageId,
				timeoutMs: 1 * 60 * 1000, // 1 Minute Timeout
			});
		} else {
			response = await chatgpt.sendMessage(message, {
				timeoutMs: 1 * 60 * 1000, // 1 Minute Timeout
			});
		}
		if ("text" in response) res.json(response);
	} catch (e) {
		console.error(e);
		res.sendStatus(400);
	}
});

// listeninng
app.listen("3080", () => console.log("listening on port 3080"));
