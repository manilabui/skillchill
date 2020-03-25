import firebase from "firebase/app"

const config = {
  apiKey: "AIzaSyDfsAvyatNM2sOSrU-E1VS7iIyGMf8NU3w",
  authDomain: "skillchillapp.firebaseapp.com",
  databaseURL: "https://skillchillapp.firebaseio.com",
  projectId: "skillchillapp",
  storageBucket: "skillchillapp.appspot.com",
  messagingSenderId: "47850746712",
  appId: "1:47850746712:web:3a44a4e4c124d940edeb2d"
}

// solution from Purii at https://github.com/zeit/next.js/issues/1999
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();