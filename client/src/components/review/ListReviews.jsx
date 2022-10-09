import React from "react";

const ListReviews = ({ reviews }) => {
  return (
    <div
      class="reviews"
      style={{ marginTop: "-12rem", paddingLeft: "5px", paddingRight: "5px" }}
    >
      <h3>Other's Reviews:</h3>
      <hr />
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} class="review-card my-3">
            <div class="rating-outer">
              <div
                class="rating-inner"
                style={{ width: `${(review.rating / 5) * 100}%` }}
              ></div>
            </div>
            <p class="review_user">by {review.name}</p>
            <p class="review_comment">{review.comment}</p>

            <hr />
          </div>
        ))}
    </div>
  );
};

export default ListReviews;
