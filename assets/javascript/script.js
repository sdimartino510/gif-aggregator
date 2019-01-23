$(document).ready(function() {

    //Creates an array of strings which will be topics for GIF searches, in this case, baseball teams.

    var topics = ["Oakland A's", "Houston Astros", "Los Angeles Angels", "Seattle Mariners", "Texas Rangers"];

    //Creates buttons for each topic

    //When the user clicks on one of the buttons, the page grabs 10 static, non-animated gif images from the GIPHY API related to that topic and places them on the page. Each GIFs rating appears below it.

    var apiKey = "UJKxGxreBmxXae04g503IlVBamFlm4Db";
    var queryURL = "https://api.giphy.com/v1/gifs/?api_key=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {



      });

    //When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

    //Adds a form to the page that takes the value from a user input box and adds it into the `topics` array.

    //Makes a function call that takes each topic in the array remakes the buttons on the page.

});