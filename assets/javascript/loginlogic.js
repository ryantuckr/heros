// modal command
$(document).ready(function () {

    $('.modal').modal();
});

var config = {
    apiKey: "AIzaSyD9zUxSiYvAJ5aS_EhGLIx_MWILBbJy4TY",
    authDomain: "project-1-530e9.firebaseapp.com",
    databaseURL: "https://project-1-530e9.firebaseio.com",
    projectId: "project-1-530e9",
    storageBucket: "project-1-530e9.appspot.com",
    messagingSenderId: "441047690869"
};

firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();
var user;


$("#googleBtn").on("click", function (event) {
    event.preventDefault();




    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        console.log(user.displayName + " is signed in.");
        console.log(user);

        loginName = user.displayName
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            window.location = 'landing.html'; //After successful login, user will be redirected to home.html
        }
    });


});

$("#logOutBtn").on("click", function (event) {
    firebase.auth().signOut().then(function () {
        console.log("User has signed out");
    }).catch(function (error) {
        // An error happened.
    });
});