var reviewsContainer = document.getElementById("reviews");

var api_url = "https://cis1110apicw.computing.edgehill.ac.uk/reviews";

var reviews = [];

window.addEventListener("load", function () {
  fetch(api_url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok" + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      reviews = data;
      renderReviews(reviews.slice(0, 5));
    })
    .catch((error) => {
      console.error(
        "There has been a problem with the fetch operation:",
        error
      );
      reviewsContainer.innerHTML = "<p>Could not load reviews.</p>";
    });
});

function renderReviews(reviewsToRender) {
  reviewsContainer.innerHTML = "";
  reviewsToRender.forEach((review) => {
    var ratingStars = "";
    for (let i = 0; i < 5; i++) {
      if (i < review.rating) {
        ratingStars += "<span class='star-filled'>*</span>";
      } else {
        ratingStars += "<span class='star-empty'>*</span>";
      }
    }

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
