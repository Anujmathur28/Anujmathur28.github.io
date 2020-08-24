var reloadQuote = function () {
    var numb = Math.floor(Math.random() * 1643);
    fetch("https://type.fit/api/quotes").then(function (response) {
        return response.json();
    }).then(function (data) {
        document.getElementById("quotes").innerHTML = data[numb].text;
        document.getElementById("author").innerHTML = data[numb].author;
    });
}
/**************************************************************************/
var imageGame = function () {
    let photosHeight;
    let photosHtml;
    let photosReference;
    let photosWidth;
    let placeId;
    const key = 'AIzaSyA2tLUogp1e_tnALcAO1-v_PLhcxdedoxM';
    const inputText = document.getElementById("searchTextField").value;
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    let queryUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${inputText}&inputtype=textquery&fields=photos,geometry,place_id,type,formatted_address,name,opening_hours,rating&key=${key}`;

    fetch(proxyUrl + queryUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            var photosObject = data.candidates[0].photos[0];
            placeId = data.candidates[0].place_id;
            photosHeight = photosObject.height;
            photosHtml = photosObject.html_attributions;
            photosReference = photosObject.photo_reference;
            photosWidth = photosObject.width;

            let text = '<img src = ';
            let imgUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photosReference}&key=${key}`;
            let text2 = ` id=cd alt=${photosReference}></img>`;
            let totalText = text + imgUrl + text2;

            document.getElementById("photo").innerHTML = totalText;

        })
        .then(function (data) {
            let imgUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=icon,photo,name,rating&key=${key}`;

            fetch(proxyUrl + imgUrl).then(function (response) {
                return response.json();

            }).then(function (data) {
                let offset = 0;
                let photoArray = data.result.photos;
                for (let index = 0; index < photoArray.length; index++) {
                    let reference = photoArray[index].photo_reference;
                    setTimeout(function(){
                        console.log(reference);
                        let text1 = '<img src = ';
                    let imgUrl1 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${key}`;
                    let text21 = ` id=cd alt=${reference}></img>`;
                    let totalText1 = text1 + imgUrl1 + text21;
                    
                    document.getElementById("photo").innerHTML = totalText1;
                        
                      }, 2000 + offset);    
                     offset += 2000;
                }
                
            });
        });
}

//let imageGames(){
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