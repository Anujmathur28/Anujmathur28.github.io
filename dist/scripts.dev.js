"use strict";

var guessPoint;
var actualPoint;
var count;
var photosHeight;
var photosHtml;
var photosReference;
var photosWidth;
var placeId;
var photoArray;
var markers = [];
var cityArray = [];
var submitButton = document.getElementById('submitButton');
var playAgain = document.getElementById('playAgain');
var distanceDisplay = document.getElementById('distance');
var key = 'AIzaSyA2tLUogp1e_tnALcAO1-v_PLhcxdedoxM';
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
playAgain.style.display = 'none';
/**************************************************************************/

var reloadQuote = function reloadQuote() {
  var numb = Math.floor(Math.random() * 1643);
  fetch("https://type.fit/api/quotes").then(function (response) {
    return response.json();
  }).then(function (data) {
    document.getElementById("quotes").innerHTML = data[numb].text;
    document.getElementById("author").innerHTML = data[numb].author;
  });
};
/**************************************************************************/


var imageGame = function imageGame(text) {
  myMap();
  var queryUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=".concat(text, "&inputtype=textquery&fields=photos,geometry,place_id,type,formatted_address,name,opening_hours,rating&key=").concat(key);
  fetch(proxyUrl + queryUrl).then(function (response) {
    return response.json();
  }).then(function (data) {
    var photosObject = data.candidates[0].photos[0];
    placeId = data.candidates[0].place_id;
  }).then(function (data) {
    var imgUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id=".concat(placeId, "&fields=geometry,plus_code,photo,name,rating&key=").concat(key);
    imageScroll(imgUrl);
  });
};
/**************************************************************************/


function imageScroll(imgUrl) {
  fetch(proxyUrl + imgUrl).then(function (response) {
    return response.json();
  }).then(function (data) {
    actualPoint = data.result.geometry.location;
    photoArray = data.result.photos;
    var totalText1 = "";

    for (var index = 0; index < photoArray.length; index++) {
      var reference = photoArray[index].photo_reference;
      totalText1 += '<img src = ';
      totalText1 += "https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=".concat(reference, "&key=").concat(key);
      totalText1 += " id=cd alt=maps width=\"600\" height=\"500\"></img>";
      totalText1 += "    ";
      document.getElementById("photo").innerHTML = totalText1;
    }
  });
}

function theMap() {
  var map = new google.maps.Map(document.getElementById("googleMap"), {
    zoom: 2.7,
    center: {
      lat: 20,
      lng: 10
    }
  });
  return map;
}
/**************************************************************************/


function myMap() {
  count = 0;
  var map = theMap(); // var marker = new google.maps.Marker({
  //   map:map
  //});

  map.addListener("click", function (e) {
    count++;
    placeMarkerAndPanTo(e.latLng, map);
  });
}
/**************************************************************************/


function clearMarkers() {
  setMapOnAll(null);
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });

  if (count > 1) {
    clearMarkers();
  }

  markers.push(marker);
  map.panTo(latLng);
  var lat = latLng.lat();

  var _long = latLng.lng();

  guessPoint = {
    lat: lat,
    lng: _long
  };
}
/**************************************************************************/


function haversine_distance(mk1, mk2) {
  var R = 3958.8; // Radius of the Earth in miles

  var rlat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians

  var rlat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians

  var difflat = rlat2 - rlat1; // Radian difference (latitudes)

  var difflon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
  return d;
}
/**************************************************************************/


function submitGuess() {
  submitButton.style.display = 'none';
  playAgain.style.display = 'block';
  var map = theMap();

  if (typeof actualPoint !== 'undefined') {
    var mk1 = new google.maps.Marker({
      position: actualPoint,
      map: map
    });
    var mk2 = new google.maps.Marker({
      position: guessPoint,
      map: map
    });
    var distM = haversine_distance(mk1, mk2);
    var distKm = distM * 1.60934;
    document.getElementById("distance").innerHTML = distKm;
    var line = new google.maps.Polyline({
      path: [actualPoint, guessPoint],
      map: map
    });
  } else {
    myMap();
  }
}
/**************************************************************************/


function city() {
  var total, where, response, data, numb;
  return regeneratorRuntime.async(function city$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          total = 500;
          where = encodeURIComponent(JSON.stringify({
            "population": {
              "$gte": 750000
            },
            "name": {
              "$exists": true
            }
          }));
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("https://parseapi.back4app.com/classes/Continentscountriescities_City?limit=".concat(total, "&where=").concat(where), {
            headers: {
              'X-Parse-Application-Id': 'HJfJB7lN31lPNqinprcyGadSouGfk82CWZp36FTh',
              // This is your app's application id
              'X-Parse-REST-API-Key': 'L79QejO3vPvlM4Vyzw88qDIgZSRUQfXjoPf6WSh2' // This is your app's REST API key

            }
          }));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          // Here you have the data that you need
          //  console.log(data);
          numb = Math.floor(Math.random() * total);

          if (typeof data.results[numb] !== 'undefined') {
            if (!cityArray.includes(data.results[numb].name)) {
              cityArray.push(data.results[numb].name);
              console.log(cityArray);
              imageGame(data.results[numb].name);
            } else {
              city();
            }
          }

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

;

(function ($) {
  $(document).on('contextmenu', 'img', function () {
    return false;
  });
})(jQuery);
/**************************************************************************/