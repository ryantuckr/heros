//when the 
$(document).ready(function () {
  // Parallax functionality
  $('.parallax').parallax();
  // carousel function

  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });


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

  //declaring token website to cature url
  //for retrieving the Meet Up access token
  var tokenWebsite = "";


  //button for signing into Meet Up and getting access token
  $("#meetBtn").on("click", function () {
    console.log("button pressed");
    //using oauth consumer key, send user to meet up
    //so that we can get authorization to their account
    //will redirect them to the landing.html page
    window.location.replace("https://secure.meetup.com/oauth2/authorize?client_id=uslukvp5bbuco9nni5lgm900av&response_type=token&redirect_uri=https://meanderthal00.github.io/4ourheroes/landing.html");
  });

  if (window.location.href.includes("access_token")) {
    tokenWebsite = window.location.href;
    console.log("tokenWebsite conditional", tokenWebsite);
    meetUpRequest();
  }

  //   // ajax function call for landing page ... meet-ups

  function meetUpRequest() {
    console.log("tokenWebsite:", tokenWebsite);
    var token = new URL(tokenWebsite).hash.split('&').filter(function (el) {
      if (el.match('access_token') !== null) return true;
    });
    console.log("token:", token);
    //spliting the access token from the property title
    var accessToken = token[0].split("=")[1];
    console.log("accessToken:", accessToken);
    $.ajax({
      url: "https://api.meetup.com/find/upcoming_events",
      method: 'GET',
      data: {
        page: 5,
        access_token: accessToken,
        key: "5a1b20747e54172335c4d412b296823",
        sign: "true"
      }
    }).done(function (response) {
      console.log(response);
      response.events.forEach(renderMeets);

    });
  };

  //ajax function for usajobs
  $("#addLocation").on("click", function () {
    console.log("submit pressed");
    var locale = $("#locationInput").val().trim();
    $("#locationInput").empty();
    $.ajax({
        url: `https://data.usajobs.gov/api/search?LocationName:${locale}&DatePosted:${30}`,
        method: 'GET',
        headers: {
          'Authorization-Key': "hIa5Qx84CEfa6bI3BB2IVTBA30EYEYetV78R14xSuu4="
        }
      }).done(function (response) {
        console.log(response);
        response.SearchResult.SearchResultItems.forEach(renderJobs);
      }),
      function (error, response, body) {
        var data = JSON.parse(body);
      };
  });



  function renderJobs(element, index) {
    console.log("success in rendering jobs function call");
    var c = $("<div>");
    c.addClass("newJob");
    var title = element.MatchedObjectDescriptor.PositionTitle;
    console.log(title);
    var b = $(`<a>${title}</a>`);
    c.append(b);
    var link = element.MatchedObjectDescriptor.PositionURI;
    console.log(link);
    b.attr("href", link);
    b.attr("target", "_blank");
    var minPay = element.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange;
    console.log(minPay);
    c.append(`<p>Minimum Pay: ${minPay}</p>`);
    $("#jobText").append(c);

  }

  function renderMeets(element, index) {
    console.log("success in rendering meet-ups function call");
    var d = $("<div>");
    d.addClass("newMeet");
    var title = element.name;
    console.log(title);
    var a = $(`<a>${title}</a>`);
    d.append(a);
    var group = element.group.name;
    console.log(group);
    d.append(`<br> ${group}<br>`);
    var link = element.link;
    console.log(link);
    a.attr("href", link);
    a.attr("target", "_blank");
    var date = element.local_date;
    d.append(`${date}<br>`);
    var time = element.local_time;
    console.log(date);
    console.log(time);
    d.append(time)
    $("#meetText").append(d);


  }


});