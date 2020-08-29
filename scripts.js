//Map Variables 
let actualPoint;
let guessPoint;
let markers = [];

//API Calls
let placeId;
const key = 'AIzaSyA2tLUogp1e_tnALcAO1-v_PLhcxdedoxM';
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
let photoArray = [];

//Verification
let clickMarkerCount;
let cityArray = [];

//DOM Element Calls
let submitButton = document.getElementById('submitButton');
let playAgain = document.getElementById('playAgain');
let distanceDisplay = document.getElementById('distance');

playAgain.style.display = 'none';

//Display quotes on main page
let reloadQuote = function () {
    let numberQuote = randomNumberGenerator(1643);
    fetch("https://type.fit/api/quotes").then(function (response) {
        return response.json();
    }).then(function (data) {
        document.getElementById("quotes").innerHTML = data[numberQuote].text;
        document.getElementById("author").innerHTML = data[numberQuote].author;
    });
}

//Generates Random numbers given the range
let randomNumberGenerator = function (maxRange) {
    let numbGenerated = Math.floor(Math.random() * maxRange);
    return numbGenerated;
}

//Main function to run the game
let imageGame = function (text) {

    playAgain.style.display = 'none';
    submitButton.style.display = 'block';

    myMap();
    const queryUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${text}&inputtype=textquery&fields=photos,geometry,place_id,type,formatted_address,name,opening_hours,rating&key=${key}`;

    fetch(proxyUrl + queryUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            let photosObject = data.candidates[0].photos[0];
            placeId = data.candidates[0].place_id;
        })
        .then(function (data) {
            let imgUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry,plus_code,photo,name,rating&key=${key}`;
            imageScroll(imgUrl);

        });
}

//Generates images and outputs to HTML 
let imageScroll = function (imgUrl) {
    fetch(proxyUrl + imgUrl).then(function (response) {
        return response.json();

    }).then(function (data) {

        actualPoint = data.result.geometry.location;
        photoArray = data.result.photos;
        let totalText1 = "";
        for (let index = 0; index < photoArray.length; index++) {
            let reference = photoArray[index].photo_reference;

            totalText1 += '<img src = ';
            totalText1 += `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${reference}&key=${key}`;
            totalText1 += ` id=cd alt=maps width="600" height="500"></img>`;
            totalText1 += "    ";

            document.getElementById("photo").innerHTML = totalText1;

        }
    });
}

//Defining the Google Map
let theMap = function () {
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
    let map = theMap();
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
        setMapOnAll(null);
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
    let R = 3958.8; // Radius of the Earth in miles
    let rlat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians
    let rlat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians
    let difflat = rlat2 - rlat1; // Radian difference (latitudes)
    let difflon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

    let dist = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return dist;
}

//Generate new game after the submit button is clicked
let submitGuess = function () {
    submitButton.style.display = 'none';
    playAgain.style.display = 'block';
    let map = theMap();

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
        document.getElementById("distance").innerHTML = distKm;
        let line = new google.maps.Polyline({
            path: [actualPoint, guessPoint],
            map: map
        });


    } else {
        myMap();
    }


}

//Call api and generate a city name
let city = async function () {

    let total = 500;
    const where = encodeURIComponent(JSON.stringify({
        "population": {
            "$gte": 750000
        },
        "name": {
            "$exists": true
        }
    }));

    const response = await fetch(
        `https://parseapi.back4app.com/classes/Continentscountriescities_City?limit=${total}&where=${where}`, {
            headers: {
                'X-Parse-Application-Id': 'HJfJB7lN31lPNqinprcyGadSouGfk82CWZp36FTh', // This is your app's application id
                'X-Parse-REST-API-Key': 'L79QejO3vPvlM4Vyzw88qDIgZSRUQfXjoPf6WSh2', // This is your app's REST API key
            }
        }
    );
    const data = await response.json(); // Here you have the data that you need


    let numb = randomNumberGenerator(total);
    if (typeof data.results[numb] !== 'undefined') {
        if (!(cityArray.includes(data.results[numb].name))) {
            cityArray.push(data.results[numb].name);
            imageGame(data.results[numb].name);
        } else {
            city();
        }
    }


};

//JQuery function to disable right clicks
(function ($) {
    $(document).on('contextmenu', 'img', function () {
        return false;
    })
})(jQuery);