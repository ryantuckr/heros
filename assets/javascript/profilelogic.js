$(document).ready(function () {
    // Parallax functionality
    $('.parallax').parallax();

    //get firebase crap all sorted out
    var config = {
        apiKey: "AIzaSyD9zUxSiYvAJ5aS_EhGLIx_MWILBbJy4TY",
        authDomain: "project-1-530e9.firebaseapp.com",
        databaseURL: "https://project-1-530e9.firebaseio.com",
        projectId: "project-1-530e9",
        storageBucket: "project-1-530e9.appspot.com",
        messagingSenderId: "441047690869"
    };
    //start firebase
    firebase.initializeApp(config);
    var database = firebase.database();
    var user;


    //updating profile info to firebase
    $("#update-btn").on("click", function (event) {
        event.preventDefault();

        console.log("Profile button was clicked");

        var firstName = $("#fn-input").val();
        var lastName = $("#ln-input").val();
        var branch = $("#branch-input").val();
        var rank = $("#rank-input").val();
        var zip = $("#zipcode-input").val();
        var hobbies = $("#hobbies-input").val();
        //create a temp object to pass to database
        var newProfile = {
            firstname: firstName,
            lastname: lastName,
            branch: branch,
            rank: rank,
            zipcode: zip,
            hobbies: hobbies,
            uid: user.uid
        };
        database.ref("/userProfiles").push(newProfile);
    });
    database.ref("/userProfiles").on("child_added", function (childSnapshot, prevChildKey) {
        //if (childSnapshot.val().uid === result.user.uid) {
        console.log(childSnapshot.val());

        // Store everything into a variable.    
        var firstName = childSnapshot.val().firstname;
        var lastName = childSnapshot.val().lastname;
        var branch = childSnapshot.val().branch;
        var rank = childSnapshot.val().rank;
        var zip = childSnapshot.val().zipcode;
        var hobbies = childSnapshot.val().hobbies;

    });
});