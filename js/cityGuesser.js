//Map Variables 
let actualPoint;
let guessPoint;
let markers = [];
let map = new google.maps.Map(document.getElementById("googleMap"), {
    zoom: 2.7,
    center: {
        lat: 20,
        lng: 10
    }
});

//API Calls
let placeId;
const key = 'AIzaSyA2tLUogp1e_tnALcAO1-v_PLhcxdedoxM';
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
let photoArray = [];
let cityAndCountry;
let cityName;
let country;
let total = 24150;
let numb;

//Verification
let markerClickCount;
let cityArray = [];
//DOM Element Calls
let submitButton = document.getElementById('submitButton');
let playAgain = document.getElementById('playAgain');
let distanceDisplay = document.getElementById('distance');
let outputText = " ";
playAgain.style.display = 'none';

//Generates Random numbers given the range
let randomNumberGenerator = function (maxRange) {
    let numbGenerated = Math.floor(Math.random() * maxRange);
    return numbGenerated;
}

//Main function to run the game
let imageGame = function (text) {
    outputText = " ";
    document.getElementById("distance").innerHTML = " ";
    playAgain.style.display = 'none';
    submitButton.style.display = 'block';

    const queryUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${text}&inputtype=textquery&fields=photos,geometry,place_id,type,formatted_address,name,opening_hours,rating&key=${key}`;

    fetch(proxyUrl + queryUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        placeId = data.candidates[0].place_id;
        imageScroll(placeId);
    });
    
    
    map = reloadMap();
    myMap();
    
}

//Generates images and outputs to HTML 
let imageScroll = function (placeId) {

    let imgUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry,plus_code,photo,name,rating&key=${key}`;

    fetch(proxyUrl + imgUrl).then(function (response) {
        return response.json();

    }).then(function (data) {

        actualPoint = data.result.geometry.location;
        photoArray = data.result.photos;
        let listImageTags = " ";
        for (let index = 0; index < photoArray.length; index++) {
            let reference = photoArray[index].photo_reference;
            listImageTags += ` <img src = https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${reference}&key=${key} id=cd alt=maps width="600" height="500"></img>    `;
        }
        document.getElementById("photo").innerHTML = listImageTags;
    });
}

//Defining the Google Map
let reloadMap = function () {
    const map = new google.maps.Map(document.getElementById("googleMap"), {
        zoom: 2.7,
        center: {
            lat: 20,
            lng: 10
        }
    });
    return map;
} 

//Instance of theMap for Interacting
let myMap = function () {
    markerClickCount = 0;
    map.addListener("click", e => {
        markerClickCount++;
        placeMarkerAndPanTo(e.latLng, map);
    });
}

//Used to clear map markers
let setMapOnAll = function (map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

//Place marker point
let placeMarkerAndPanTo = function (latLng, map) {

    let marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    if (markerClickCount > 1) {
        setMapOnAll();
    }

    markers.push(marker);

    map.panTo(latLng);

    let lat = latLng.lat();
    let long = latLng.lng();
    guessPoint = {
        lat: lat,
        lng: long
    };
}

//Used to calculate distances between two coordinate points on a sphere
let haversineDistance = function (mk1, mk2) {
    const R = 3958.8; // Radius of the Earth in miles
    const rLat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians
    const rLat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians
    const diffLat = rLat2 - rLat1; // Radian difference (latitudes)
    const diffLon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)
    const dist = 2 * R * Math.asin(Math.sqrt(Math.sin(diffLat / 2) * Math.sin(diffLat / 2) + Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(diffLon / 2) * Math.sin(diffLon / 2)));
    return dist;
}

//Generate new game after the submit button is clicked
let submitGuess = function () {
    submitButton.style.display = 'none';
    playAgain.style.display = 'block';

    if (typeof actualPoint !== 'undefined') {


        let mk1 = new google.maps.Marker({
            position: actualPoint,
            map: map
        });
        let mk2 = new google.maps.Marker({
            position: guessPoint,
            map: map
        });
        let distM = haversineDistance(mk1, mk2);
        let distKm = distM * 1.60934;
        if(distKm <= 100){outputText = "Wow thats very impressive! ";}
        outputText += "You were " + distKm.toFixed(1) + " Km away from the city of " + cityName +" in " + country + "!";
        document.getElementById("distance").innerHTML = outputText;
        let line = new google.maps.Polyline({
            path: [actualPoint, guessPoint],
            map: map
        });


    } else {
        map = reloadMap();
    }
}

//Call api and generate a city name
let city = async function () {
    //The City Data is found from http://geodb-cities-api.wirefreethought.com/ Please try it out!
    numb = randomNumberGenerator(total);
    const response = await fetch(
        `http://geodb-free-service.wirefreethought.com/v1/geo/cities?minPopulation=40000&limit=1&offset=${numb}&hateoasMode=off`
    );

    const output = await response.json();

    country = output.data[0].country;
    cityName = output.data[0].name;
    cityAndCountry = output.data[0].name + " " + country;
    console.log(output);
    if (typeof cityAndCountry !== 'undefined') {
        if (!(cityArray.includes(cityAndCountry))) {
            cityArray.push(cityAndCountry);
            imageGame(cityAndCountry);
        } else {
            city();
        }
    }
};

