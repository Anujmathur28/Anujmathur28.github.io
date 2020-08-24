"use strict";

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
  var photosHeight;
  var photosHtml;
  var photosReference;
  var photosWidth;
  var placeId;
  var key = 'AIzaSyA2tLUogp1e_tnALcAO1-v_PLhcxdedoxM'; // const inputText = document.getElementById("searchTextField").value;

  var inputText = text;
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var queryUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=".concat(inputText, "&inputtype=textquery&fields=photos,geometry,place_id,type,formatted_address,name,opening_hours,rating&key=").concat(key);
  fetch(proxyUrl + queryUrl).then(function (response) {
    return response.json();
  }).then(function (data) {
    var photosObject = data.candidates[0].photos[0];
    placeId = data.candidates[0].place_id;
    photosHeight = photosObject.height;
    photosHtml = photosObject.html_attributions;
    photosReference = photosObject.photo_reference;
    photosWidth = photosObject.width;
  }).then(function (data) {
    var imgUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id=".concat(placeId, "&fields=icon,photo,name,rating&key=").concat(key);
    fetch(proxyUrl + imgUrl).then(function (response) {
      return response.json();
    }).then(function (data) {
      var offset = 0;
      var photoArray = data.result.photos;

      var _loop = function _loop(index) {
        var reference = photoArray[index].photo_reference;
        setTimeout(function () {
          var text1 = '<img src = ';
          var imgUrl1 = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=".concat(reference, "&key=").concat(key);
          var text21 = " id=cd alt=".concat(reference, "></img>");
          var totalText1 = text1 + imgUrl1 + text21;
          document.getElementById("photo").innerHTML = totalText1;
        }, 2000 + offset);
        offset += 2000;
      };

      for (var index = 0; index < photoArray.length; index++) {
        _loop(index);
      }
    });
  });
}; //let imageGames(){
//  console.log()
//}

/* 
                    let text1 = '<img src = ';
                    let imgUrl1 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${key}`;
                    let text21 = ` id=cd alt=${reference}></img>`;
                    let totalText1 = text1 + imgUrl1 + text21;
                    
                    document.getElementById("photo").innerHTML = totalText1;*/

/*********************************************************************************/


function initialize() {
  var input = document.getElementById('searchTextField');
  new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', initialize);
/************************************************************************************/

function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(51.508742, -0.120850),
    zoom: 5
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}
/************************************************************************************/


var city = function _callee() {
  var total, where, response, data, numb;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          total = 245;
          where = encodeURIComponent(JSON.stringify({
            "capital": {
              "$exists": true
            }
          }));
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("https://parseapi.back4app.com/classes/Continentscountriescities_Country?limit=".concat(total, "&order=emoji&excludeKeys=emoji,phone,currency,shape&where=").concat(where), {
            headers: {
              'X-Parse-Application-Id': 'g5GddGZX5VkbEL3fuVL1HGrvY8k7BkzcOCAK0UFA',
              // This is your app's application id
              'X-Parse-REST-API-Key': 'FrSe7oACe16OuMzNGPaDV3np6tzIpl3AZwVgACEG' // This is your app's REST API key

            }
          }));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          numb = Math.floor(Math.random() * total);

          if (typeof data.results[numb].capital !== 'undefined') {
            imageGame(data.results[numb].capital);
          }

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}();