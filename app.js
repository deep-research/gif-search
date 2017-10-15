$(document).ready(function() {

	// Topic list
	topics = ["dog", "cat", "rabbit", "hampster", "skunk",
			  "goldfish", "bird", "ferret", "turtle", "sugar glider",
			  "chinchilla", "hedgehog", "hermit crab", "gerbil",
			  "pygmy goat", "chicken", "capybara", "teacup pig",
			  "serval", "salamander", "frog"];

	// Add button template
	var addButton = function(btnName) {
		var button = $("<button>").text(btnName).val(btnName).addClass("btn btn-primary btn-sm topic-btn")
		$("#buttons").append(button);	
	};

	// Initial buttons are generated for each topic
	for (var i=0; i<topics.length; i++) {
		addButton(topics[i]);
	};

	// Additional buttons are added through the form
	$("#submit-btn").on("click", function(event) {
		event.preventDefault();
		btnVal = $("input").val();
		if (btnVal) {
			$("form").trigger("reset");
			addButton(btnVal);
		};
	});

	// When a topic-button in pressed, display API content
	$("#buttons").on("click", ".topic-btn", function(event) {
		btnName = $(this).val()
		var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ btnName + "&rating=pg&api_key=dc6zaTOxFJmzC&limit=10"
	    $.ajax({
	        url: queryURL,
	        method: 'GET'
	    })

	    .done(function(response) {
	        $("#images").empty()
	        for (var i=0; i< response.data.length; i++) {

	        	// API URLs
	        	imgURL = response.data[i].images.original_still.url
	        	gifURL = response.data[i].images.downsized.url

	        	// Create img element for every image
	        	galleryImage = $("<img>").css("width", "200px").css("height", "200px")

	        	// Image generic information
	        	galleryImage.attr("id", "gallery-img").attr("animal", btnName).attr("alt", btnName + " image")

	        	// Movement data
	        	galleryImage.attr("src", imgURL)
	        	galleryImage.attr("data-still", imgURL).attr("data-animate", gifURL).attr("data-state", "still")

	        	// Create a gallery div to display a rating with each image
	        	galleryDiv = $("<div>").css("width", "200px").attr("id", "gallery-div")	 

	        	// Create a div to store the image ratings
	        	ratingDiv = $("<div>Rating: " + response.data[i].rating + "</div>")

	        	// Add CSS properties to the rating divs
	        	ratingDiv.css("margin-bottom", "8px").css("margin-top", "15px").css("font-size", "20px")

	        	// Add the images and ratings to the page	
	        	galleryDiv.append(ratingDiv).append(galleryImage)
	        	$("#images").append(galleryDiv)
	        };
	    });
	});

	$("#images").on("click", "#gallery-img", function() {
        var state = $(this).attr("data-state");

        // Switch the attribute (still to animate or vice versa) and run the new one
        if (state === "still") {

            $(this).attr("data-state", "animate");
            var dataAnimate = $(this).attr("data-animate")
            $(this).attr("src", dataAnimate);

            // Change alt txt to "animal gif"
            var animalName = $(this).attr("animal");
            $(this).attr("alt", animalName + " gif");

        } else if (state === "animate") {

            $(this).attr("data-state", "still");
            var dataStill = $(this).attr("data-still")
            $(this).attr("src", dataStill);

            // Change alt txt to "animal img"
            var animalName = $(this).attr("animal");
            $(this).attr("alt", animalName + " img");
            
        };
	})
});