$(document).ready(function() {
  //Creates an array of strings which will be topics for GIF searches, in this case, baseball teams.

  var topics = [
    "Oakland A's",
    "Houston Astros",
    "Los Angeles Angels",
    "Seattle Mariners",
    "Texas Rangers"
  ];

  //Creates buttons for each topic

  function createButtons() {
    // Delete the content inside the button-box div prior to adding new buttons

    $(".button-box").empty();

    // Loop through the array of movies, then generate buttons for each movie in the array

    for (var i = 0; i < topics.length; i++) {
      var gifButton = $("<button>");

      gifButton.addClass("gif-button");

      gifButton.attr("data-type", topics[i]);

      gifButton.text(topics[i]);

      $(".button-box").append(gifButton);
    }
  }

  // This function handles events where the add gif button is clicked

  $("#add-gif").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.

    event.preventDefault();

    // This code grabs the text the user types into the input field

    const userInput = $("#gif-input")
      .val()
      .trim();

    // This code adds the new gif topic into the topics array

    if (!topics.includes(userInput)) {
      topics.push(userInput);
    }

    // The createButtons function is called, creating the list of gif buttons

    createButtons();

    $("#gif-input").val("");

  });

  // Calling the createButtons function to display the initial list of topics

  createButtons();

  //When the user clicks on one of the buttons, the page grabs 10 static, non-animated gif images from the GIPHY API related to that topic and places them on the page. Each GIFs rating appears below it.

  $(document).on("click", ".gif-button", function() {
    $(".gif-box").empty();

    var type = $(this).data("type");

    var apiKey = "UJKxGxreBmxXae04g503IlVBamFlm4Db";
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=" + apiKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        console.log(response);

        for (var i = 0; i < response.data.length; i++) {

            var searchDiv = $("<div class='search-item'>");

            var rating = response.data[i].rating;

            var p = $("<h3>").text("Rating: " + rating);

            var animated = response.data[i].images.fixed_height.url;

            var still = response.data[i].images.fixed_height_still.url;

            var img = $("<img>");

            img.attr("src", still);

            img.attr("data-still", still);

            img.attr("data-animated", animated);

            img.attr("data-state", "still");

            img.addClass("search-gif");

            searchDiv.append(img, p);

            // searchDiv.append(img);

            $(".gif-box").append(searchDiv);

        }

    });

  });

  $(document).on("click", ".search-gif", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {

        $(this).attr("src", $(this).data("animated"));

        $(this).attr("data-state", "animated");

    } else if (state === "animated") {

        $(this).attr("src", $(this).data("still"));

        $(this).attr("data-state", "still");

    }

  })

  //When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

  //Adds a form to the page that takes the value from a user input box and adds it into the `topics` array.

  //Makes a function call that takes each topic in the array remakes the buttons on the page.
});
