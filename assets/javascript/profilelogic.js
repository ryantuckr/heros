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

    $("#userId").text(localStorage.getItem("name"));


    //updating profile info to firebase
    $("#update-btn").on("click", function (event) {
        event.preventDefault();

        console.log("Profile button was clicked");

        var firstName = $("#first_name").val();
        var lastName = $("#last_name").val();
        var email = $("#email").val();
        var branch = $("#branch").val();
        var rank = $("#rank").val();
        var zip = $("#zip").val();
        var hobbies = $("#interests").val();
        //create a temp object to pass to database
        var newProfile = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            branch: branch,
            rank: rank,
            zipcode: zip,
            hobbies: hobbies

        };
        database.ref("/userProfiles").push(newProfile);

        $("#first_name").val("");
        $("#last_name").val("");
        $("#email").val("");
        $("#branch").val("");
        $("#rank").val("");
        $("#zip").val("");
        $("#interests").val("");


    });



    database.ref("/userProfiles").on("child_added", function (childSnapshot, prevChildKey) {
        //if (childSnapshot.val().uid === result.user.uid) {
        console.log(childSnapshot.val());

        // Store everything into a variable.    
        var firstName = childSnapshot.val().firstname;
        var lastName = childSnapshot.val().lastname;
        var email = childSnapshot.val().email;
        var branch = childSnapshot.val().branch;
        var rank = childSnapshot.val().rank;
        var zip = childSnapshot.val().zipcode;
        var hobbies = childSnapshot.val().hobbies;

        $("userId").html(firstName);


    });
});

$("#signOutBtn").on("click", function (event) {
    firebase.auth().signOut().then(function () {
        console.log("User has signed out");
        window.location = 'index.html'; //After successful login, user will be redirected to index.html
    }).catch(function (error) {
        // An error happened.
        console.log("signout error");
    });
});