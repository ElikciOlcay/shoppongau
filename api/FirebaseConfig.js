import Firebase from 'firebase';  

let config = {  
    apiKey: "AIzaSyBTSOsJTcxbwz2dkENRbL_CFmGw_xH9W0g",
    authDomain: "shoppongau.firebaseapp.com",
    databaseURL: "https://shoppongau.firebaseio.com",
    projectId: "shoppongau",
    storageBucket: "shoppongau.appspot.com",
    messagingSenderId: "217527356657"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

  