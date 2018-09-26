$(document).ready(function() {
  console.log("Ikuze!!")
 });

var gifs = ["Weird Al", "Mario Bros", "Bearded vulture", "Ducks", "Street fighter", "My Hero Academia"];

function makeButtons(){ 
	
	$('#gifButton').empty();
	
	for (var i = 0; i < gifs.length; i++){
		
		var gifButton = $('<button>') 
		gifButton.addClass('gifs'); 
		gifButton.attr('data-name', gifs[i]);
    gifButton.text(gifs[i]); 
    
    $('#gifButton').append(gifButton);
  }
}

//adds new gif buttons
$("#submit").on("click", function(){

	var another = $("#search-term").val().trim();

	gifs.push(another);
	
	makeButtons();
	
  return false; 
})

$("button").on("click", function() {
  var gif = $(this).attr("data-gif");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gif + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {

    console.log(response);
    
    var results = response.data;

     for (var i = 0; i < results.length; i++) {

      var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
          var gifImage = $("<img>");
          gifImage.addClass("gif");
          gifImage.attr("src", results[i].images.fixed_height.url);
          gifImage.attr("data-still", results[i].images.fixed_height.url);
          gifImage.attr("data-animate", results[i].images.fixed_height.url);
          gifDiv.prepend(p);
          gifDiv.prepend(gifImage);
          
          $("#gifs-appear-here").prepend(gifDiv);

     }

  });
});


 $(document).on("click",".gif", function() {
 
  var state = $(this).attr("data-state");
  
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } 
  
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

$(document).on("click", ".show", displayGifs);

makeButtons();