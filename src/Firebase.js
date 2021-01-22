import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBY9UFN1rBTgmF-TR6dE1FRDSINC14kgOs",
    authDomain: "practice-project-d81d3.firebaseapp.com",
    databaseURL: "https://practice-project-d81d3-default-rtdb.firebaseio.com",
    projectId: "practice-project-d81d3",
    storageBucket: "practice-project-d81d3.appspot.com",
    messagingSenderId: "1065210716080",
    appId: "1:1065210716080:web:069637198a5eaee43b0075"
  };
  // Initialize Firebase
const fireDB = firebase.initializeApp(firebaseConfig);

const firebaseDB = fireDB.database().ref();
const storage = fireDB.storage();


export {firebaseDB, storage};