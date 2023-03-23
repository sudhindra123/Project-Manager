import firebase from "firebase/app";
// this above line is mandatory if we are using the firebase

import 'firebase/firestore'
// the above line is to import firestore services

import 'firebase/auth'
// to  import the auth services

import 'firebase/storage'
// this is for the storage services


const firebaseConfig = {
    apiKey: "AIzaSyB7KrAlymSNGlxemHqEXlSO1V4axe56T1A",
    authDomain: "project-manager-84331.firebaseapp.com",
    projectId: "project-manager-84331",
    storageBucket: "project-manager-84331.appspot.com",
    messagingSenderId: "985288906520",
    appId: "1:985288906520:web:8b24c8969ee1b1bcccf06d"
  };

  //initialize firebase (i.e the initailization of application)
  firebase.initializeApp(firebaseConfig)

  //initialize the services
  const projectFirestore  =firebase.firestore()

  //initialize the auth services
  const projectAuth = firebase.auth()


//to get the timestamp
const timestamp = firebase.firestore.Timestamp


// to initialize the storage services
const projectStorge = firebase.storage()



  export{projectFirestore,projectAuth,timestamp,projectStorge}



