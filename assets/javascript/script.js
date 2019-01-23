$(document).ready(function() {

    //Creates an array of strings which will be topics for GIF searches, in this case, baseball teams.

    var topics = ["Oakland A's", "Houston Astros", "Los Angeles Angels", "Seattle Mariners", "Texas Rangers"];

    //Creates buttons for each topic

    function createButtons() {

        // Delete the content inside the button-box div prior to adding new buttons

        $(".button-box").empty();

        // Loop through the array of movies, then generate buttons for each movie in the array

        for (var i = 0; i < topics.length; i++) {

        //   const topics = topics[i];

          var gifButton = $("<button>");

          gifButton.addClass("gif-button gif gif-button-color");

          gifButton.text(topics[i]);

          $(".button-box").append(gifButton);

        }

    }

    // This function handles events where the add gif button is clicked

    $("#add-gif").on("click", function(event) {

        // event.preventDefault() prevents submit button from trying to send a form.
        
        event.preventDefault();

        // This code grabs the text the user types into the input field

        const userInput = $("#gif-input").val().trim();

        // This code adds the new gif topic into the topics array

        if (!topics.includes(userInput)) {

            topics.push(userInput);

        }

        // The createButtons function is called, creating the list of gif buttons

        createButtons();

    });

    // Calling the createButtons function to display the initial list of topics

    createButtons();

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