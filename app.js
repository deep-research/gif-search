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
	        // console.log(response);
	        $("#images").empty()
	        for (var i=0; i< response.data.length; i++) {
	        	newDiv = $("<div>").css("width", "200px").attr("id", "gallery-div")
	        	console.log(response.data[i])
	        	imgURL = response.data[i].images.original_still.url
	        	gifURL = response.data[i].images.downsized.url
	        	newImage = $("<img>")
	        	newImage.css("width", "200px")
	        	newImage.css("height", "200px")
	        	newImage.attr("id", "gallery-img").attr("alt", btnName + " image")
	        	newImage.attr("src", imgURL).attr("data-state", "still")
	        	newImage.attr("data-still", imgURL).attr("data-animate", gifURL)
	        	newDiv.append("<div style='margin-bottom: 8px; margin-top: 15px; font-size: 20px;'>Rating: " + response.data[i].rating + "</div>")
	        	newDiv.append(newImage)
	        	$("#images").append(newDiv)

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
        } else if (state === "animate") {
            $(this).attr("data-state", "still");
            var dataStill = $(this).attr("data-still")
            $(this).attr("src", dataStill);
        };
	})
});