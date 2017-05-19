var gifyListTwo = ["clinton", "obama", "trump", ];

for (var i = 0; i < gifyListTwo.length; i++) {
    var letterBtn = $("<button>");
    letterBtn.addClass("btn");
    letterBtn.attr("data-person", gifyListTwo[i]);
    letterBtn.text(gifyListTwo[i]);
    $("#buttons").append(letterBtn);

}

var gifyList = [];
//Function to add buttons based on user input 
$("#submitButton").on("click", function() {
    event.preventDefault();
    //Getting the value of the search 
    var userInput = $("#searchText").val().trim();

    gifyList.push(userInput);


    console.log(gifyList);

    var gifyButton = $("<button>");

    gifyButton.attr("data-person", userInput);
    gifyButton.addClass("btn");
    gifyButton.append(userInput);


    $("#buttons").append(gifyButton);






    // var userInput = $("#searchText").val().trim();




});



$("body").on("click", "button", function() {
    $("#gifs-appear-here").empty();

    var person = $(this).attr("data-person");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";




    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;


            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);
                personImage.addClass("gifImages");

                gifDiv.prepend(p);
                gifDiv.prepend(personImage);

                $("#gifs-appear-here").prepend(gifDiv);
            }
        });
});
$("body").on("click", ".gifImages", function() {
    alert("you've been clicked");
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
