var reloadQuote = function(){ 
var numb = Math.floor(Math.random() * 1643);
fetch("https://type.fit/api/quotes").then(function (response) {
    return response.json();
}).then(function (data) {
    document.getElementById("quotes").innerHTML = data[numb].text;
    document.getElementById("author").innerHTML = data[numb].author;
});
}
