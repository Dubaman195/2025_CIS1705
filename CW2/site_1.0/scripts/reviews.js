// Variable to store the reviews container element
var reviewsContainer = document.getElementById("reviews");

// Variable to store the API URL
var api_url = "https://cis1110apicw.computing.edgehill.ac.uk/reviews";

// Variable to store the reviews array
var reviews = [];

// Event listener to load reviews when the page is loaded
window.addEventListener("load", function () {
	// Fetch the reviews from the API
	fetch(api_url)
		.then((response) => {
			// Check if the response is ok
			if (!response.ok) {
				throw new Error("Network response was not ok" + response.statusText);
			}
			return response.json();
		})
		// Convert the response to JSON
		.then((data) => {
			reviews = data;
			renderReviews(reviews.slice(0, 5));
		})
		// Handle any errors
		.catch((error) => {
			console.error(
				"There has been a problem with the fetch operation:",
				error
			);
			// Display error message
			reviewsContainer.innerHTML = "<p>Could not load reviews.</p>";
		});
});

// Function to render reviews
function renderReviews(reviewsToRender) {
	// Clear the reviews container
	reviewsContainer.innerHTML = "";
	// Loop through the reviews
	reviewsToRender.forEach((review) => {
		// Create the rating stars
		var ratingStars = "";
		// Loop through the rating star count (5)
		for (let i = 0; i < 5; i++) {
			if (i < review.rating) {
				// If the rating is less than the current index, add a filled star
				ratingStars += "<span class='star-filled'>*</span>";
			} else {
				// If the rating is greater than the current index, add an empty/black star
				ratingStars += "<span class='star-empty'>*</span>";
			}
		}
		// Add the review to the reviews container
		reviewsContainer.innerHTML += `
      <div class="review">
        <div class="review-left">
          <img src="robot-juice-images/reviewicon1.jpg" alt="Review icon">
          <div class="review-title">
            <h2 class="rating">${ratingStars}</h2>
            <h3 class="review-name">${review.nickname}</h3>
          </div>
        </div>
        <p class="review-content">${review.review}</p>
      </div>`;
	});
}

// Function to hide an element, used to hide the show all reviews button
function hideElement(elementId) {
	// Get the element by ID
	var element = document.getElementById(elementId);
	// Hide the element
	element.style.display = "none";
}
