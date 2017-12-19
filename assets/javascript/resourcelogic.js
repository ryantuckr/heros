var config = {
    apiKey: "AIzaSyD9zUxSiYvAJ5aS_EhGLIx_MWILBbJy4TY",
    authDomain: "project-1-530e9.firebaseapp.com",
    databaseURL: "https://project-1-530e9.firebaseio.com",
    projectId: "project-1-530e9",
    storageBucket: "project-1-530e9.appspot.com",
    messagingSenderId: "441047690869"
  };


  firebase.initializeApp(config);

  $("#userId").text(localStorage.getItem("name"));


  // signout function
$("#signOutBtn").on("click", function (event) {
    firebase.auth().signOut().then(function () {
      console.log("User has signed out");
      window.location = 'index.html'; //After successful login, user will be redirected to index.html
    }).catch(function (error) {
      // An error happened.
      console.log("signout error");
    });
  });