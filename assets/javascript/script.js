$(document).ready(function() {

  //Creates an array of strings which will be topics for GIF searches, in this case, baseball teams.

  var topics = [
    "LOL",
    "OMG",
    "WTF",
    "derp",
  ];

  //Function that creates buttons for each topic

  function createButtons() {

    //Deletes the content inside the button-box div prior to adding new buttons

    $(".button-box").empty();

    //Loops through the array of topics, then generates buttons for each topic in the array

    for (var i = 0; i < topics.length; i++) {
      var gifButton = $("<button>");

      gifButton.addClass("gif-button");

      gifButton.attr("data-type", topics[i]);

      gifButton.text(topics[i]);

      $(".button-box").append(gifButton);
    }
  }

  //This function handles events where the add gif button is clicked

  $("#add-gif").on("click", function(event) {

    //Prevents submit button from trying to send a form.

    event.preventDefault();

    //Grabs the text the user types into the input field

    const userInput = $("#gif-input")
      .val()
      .trim();

    //Adds the new gif topic into the topics array

    if (!topics.includes(userInput)) {
      topics.push(userInput);
    }

    //The createButtons function is called, creating the list of gif buttons

    createButtons();

    $("#gif-input").val("");
  });

  //Calls the createButtons function to display the initial list of topics

  createButtons();

  //When the user clicks on one of the buttons, the page grabs 10 static, non-animated gif images from the GIPHY API related to that topic and places them on the page. Each GIFs rating appears below it.

  $(document).on("click", ".gif-button", function() {

    //Clears the .gif-box div of buttons before recreating them

    $(".gif-box").empty();

    var type = $(this).data("type");

    //Putting together our query URL (including the API key)

    var apiKey = "UJKxGxreBmxXae04g503IlVBamFlm4Db";
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=" + apiKey;

    //The AJAX call

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      //Parsing the JSON data received

      for (var i = 0; i < response.data.length; i++) {
        var searchDiv = $("<div class='search-item'>");

        //Gets the rating for each GIF and prepares it to be displayed

        var rating = response.data[i].rating;

        var gifRating = $("<h4>").text("Rating: " + rating);

        //This code is part of the play/pause functionality

        var animated = response.data[i].images.fixed_height.url;

        var still = response.data[i].images.fixed_height_still.url;

        var img = $("<img>");

        img.attr("src", still);

        img.attr("data-still", still);

        img.attr("data-animated", animated);

        img.attr("data-state", "still");

        img.addClass("search-gif");

        //Appends the GIFs and their ratings to the .gif-box div

        searchDiv.append(img, gifRating);

        $(".gif-box").append(searchDiv);
      }
    });
  });

  //Finishes adding the play/pause functionality

  $(document).on("click", ".search-gif", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).data("animated"));

      $(this).attr("data-state", "animated");
    } else if (state === "animated") {
      $(this).attr("src", $(this).data("still"));

      $(this).attr("data-state", "still");
    }
  });
});
