import firebase from 'firebase';
require("firebase/firestore");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC8yMkTaghcbce2H--a6G_cLJWPtJ4xacA",
    authDomain: "hackmit-7c665.firebaseapp.com",
    databaseURL: "https://hackmit-7c665.firebaseio.com",
    projectId: "hackmit-7c665",
    storageBucket: "hackmit-7c665.appspot.com",
    messagingSenderId: "143986230583"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const storageRef = firebase.storage().ref();

var firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

export const db = firestore;