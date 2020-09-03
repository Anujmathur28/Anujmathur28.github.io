"use strict";

//Map Variables 
var actualPoint;
var guessPoint;
var markers = [];
var map = new google.maps.Map(document.getElementById("googleMap"), {
  zoom: 2.7,
  center: {
    lat: 20,
    lng: 10
  }
}); //API Calls

var placeId;
var key = 'AIzaSyA2tLUogp1e_tnALcAO1-v_PLhcxdedoxM';
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var photoArray = [];
var cityAndCountry;
var cityName;
var country;
var total = 24150;
var numb; //Verification

var markerClickCount;
var cityArray = []; //DOM Element Calls

var submitButton = document.getElementById('submitButton');
var playAgain = document.getElementById('playAgain');
var distanceDisplay = document.getElementById('distance');
var outputText = " ";
playAgain.style.display = 'none'; //Generates Random numbers given the range

var randomNumberGenerator = function randomNumberGenerator(maxRange) {
  var numbGenerated = Math.floor(Math.random() * maxRange);
  return numbGenerated;
}; //Main function to run the game


var imageGame = function imageGame(text) {
  outputText = " ";
  document.getElementById("distance").innerHTML = " ";
  playAgain.style.display = 'none';
  submitButton.style.display = 'block';
  var queryUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=".concat(text, "&inputtype=textquery&fields=photos,geometry,place_id,type,formatted_address,name,opening_hours,rating&key=").concat(key);
  fetch(proxyUrl + queryUrl).then(function (response) {
    return response.json();
  }).then(function (data) {
    placeId = data.candidates[0].place_id;
    imageScroll(placeId);
  });
  map = reloadMap();
  myMap();
}; //Generates images and outputs to HTML 


var imageScroll = function imageScroll(placeId) {
  var imgUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id=".concat(placeId, "&fields=geometry,plus_code,photo,name,rating&key=").concat(key);
  fetch(proxyUrl + imgUrl).then(function (response) {
    return response.json();
  }).then(function (data) {
    actualPoint = data.result.geometry.location;
    photoArray = data.result.photos;
    var listImageTags = " ";

    for (var index = 0; index < photoArray.length; index++) {
      var reference = photoArray[index].photo_reference;
      listImageTags += " <img src = https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=".concat(reference, "&key=").concat(key, " id=cd alt=maps width=\"600\" height=\"500\"></img>    ");
    }

    document.getElementById("photo").innerHTML = listImageTags;
  });
}; //Defining the Google Map


var reloadMap = function reloadMap() {
  var map = new google.maps.Map(document.getElementById("googleMap"), {
    zoom: 2.7,
    center: {
      lat: 20,
      lng: 10
    }
  });
  return map;
}; //Instance of theMap for Interacting


var myMap = function myMap() {
  markerClickCount = 0;
  map.addListener("click", function (e) {
    markerClickCount++;
    placeMarkerAndPanTo(e.latLng, map);
  });
}; //Used to clear map markers


var setMapOnAll = function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}; //Place marker point


var placeMarkerAndPanTo = function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });

  if (markerClickCount > 1) {
    setMapOnAll();
  }

  markers.push(marker);
  map.panTo(latLng);
  var lat = latLng.lat();

  var _long = latLng.lng();

  guessPoint = {
    lat: lat,
    lng: _long
  };
}; //Used to calculate distances between two coordinate points on a sphere


var haversineDistance = function haversineDistance(mk1, mk2) {
  var R = 3958.8; // Radius of the Earth in miles

  var rLat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians

  var rLat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians

  var diffLat = rLat2 - rLat1; // Radian difference (latitudes)

  var diffLon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

  var dist = 2 * R * Math.asin(Math.sqrt(Math.sin(diffLat / 2) * Math.sin(diffLat / 2) + Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(diffLon / 2) * Math.sin(diffLon / 2)));
  return dist;
}; //Generate new game after the submit button is clicked


var submitGuess = function submitGuess() {
  submitButton.style.display = 'none';
  playAgain.style.display = 'block';

  if (typeof actualPoint !== 'undefined') {
    var mk1 = new google.maps.Marker({
      position: actualPoint,
      map: map
    });
    var mk2 = new google.maps.Marker({
      position: guessPoint,
      map: map
    });
    var distM = haversineDistance(mk1, mk2);
    var distKm = distM * 1.60934;

    if (distKm <= 100) {
      outputText = "Wow thats very impressive! ";
    }

    outputText += "You were " + distKm.toFixed(1) + " Km away from the city of " + cityName + " in " + country + "!";
    document.getElementById("distance").innerHTML = outputText;
    var line = new google.maps.Polyline({
      path: [actualPoint, guessPoint],
      map: map
    });
  } else {
    map = reloadMap();
  }
}; //Call api and generate a city name


var city = function city() {
  var response, output;
  return regeneratorRuntime.async(function city$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //The City Data is found from http://geodb-cities-api.wirefreethought.com/ Please try it out!
          numb = randomNumberGenerator(total);
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("http://geodb-free-service.wirefreethought.com/v1/geo/cities?minPopulation=40000&limit=1&offset=".concat(numb, "&hateoasMode=off")));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          output = _context.sent;
          country = output.data[0].country;
          cityName = output.data[0].name;
          cityAndCountry = output.data[0].name + " " + country;
          console.log(output);

          if (typeof cityAndCountry !== 'undefined') {
            if (!cityArray.includes(cityAndCountry)) {
              cityArray.push(cityAndCountry);
              imageGame(cityAndCountry);
            } else {
              city();
            }
          }

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};