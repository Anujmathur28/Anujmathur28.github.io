"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.haversineDistance = exports.placeMarkerAndPanTo = exports.setMapOnAll = exports.myMap = exports.reloadMap = exports.guessPoint = exports.map = void 0;
var map = new google.maps.Map(document.getElementById("googleMap"), {
  zoom: 2.7,
  center: {
    lat: 20,
    lng: 10
  }
});
exports.map = map;
var markers = [];
var markerClickCount;
var guessPoint; //Defining the Google Map

exports.guessPoint = guessPoint;

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


exports.reloadMap = reloadMap;

var myMap = function myMap() {
  markerClickCount = 0;
  map.addListener("click", function (e) {
    markerClickCount++;
    placeMarkerAndPanTo(e.latLng, map);
  });
}; //Used to clear map markers


exports.myMap = myMap;

var setMapOnAll = function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}; //Place marker point


exports.setMapOnAll = setMapOnAll;

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

  exports.guessPoint = guessPoint = {
    lat: lat,
    lng: _long
  };
}; //Used to calculate distances between two coordinate points on a sphere


exports.placeMarkerAndPanTo = placeMarkerAndPanTo;

var haversineDistance = function haversineDistance(mk1, mk2) {
  var R = 3958.8; // Radius of the Earth in miles

  var rLat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians

  var rLat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians

  var diffLat = rLat2 - rLat1; // Radian difference (latitudes)

  var diffLon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

  var dist = 2 * R * Math.asin(Math.sqrt(Math.sin(diffLat / 2) * Math.sin(diffLat / 2) + Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(diffLon / 2) * Math.sin(diffLon / 2)));
  return dist;
};

exports.haversineDistance = haversineDistance;