var games = ['Red Dead Redemption', 'Grand Theft Auto', 'Super Meat Boy', 'PUBG'];

	function displayGif(){

		var gif = $(this).attr('data-name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=4yYFeiUBylWV2rMQ8pI7qexhzfkowVIv&limit=10";

		 $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
		 	console.log(response);
			$("#gifsView").empty();
            for (var i = 0; i < response.data.length; i++){

            	var rating = response.data[i].rating;
                var imageUrl = response.data[i].images.fixed_height.url;
             	var imageStillUrl = response.data[i].images.fixed_height_still.url;

                var image = $("<img>");
                var ratingText = $("<p id='rating'>" + "Rating: " + rating + "</p>");

                
                image.attr('src', imageStillUrl);
                image.attr('alt', 'gif');
                image.attr('data-state', 'still');
                image.attr('data-still', imageStillUrl);
                image.attr('data-animate', imageUrl);


                $('#gamesView').prepend(image, ratingText);
                checkState ();
            }
		 }); 
	} 

	function renderButtons(){ 

		$('#buttonsView').empty();

		for (var i = 0; i < games.length; i++){

		    var newButton = $('<button class="btn btn-danger">') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    newButton.addClass('game'); // Added a class 
		    newButton.attr('data-name', games[i]); // Added a data-attribute
		    newButton.text(games[i]); // Provided the initial button text
		    $('#buttonsView').append(newButton); // Added the button to the HTML
		}
	}

	$('#addGame').on('click', function(){

		var game = $('#vidGame-input').val().trim();

		games.push(game);
		
		renderButtons();

		return false;
	})


	$(document).on('click', '.game', displayGif);

	renderButtons();

	function checkState(){
		$('img').on('click', function(){
	  var state = $(this).attr('data-state'); 
	  if (state == 'still'){
	  $(this).attr('src', $(this).data('animate'));
	  $(this).attr('data-state', 'animate');
	  }else{
	  $(this).attr('src', $(this).data('still'));
	  $(this).attr('data-state', 'still');
	}

		});
	};