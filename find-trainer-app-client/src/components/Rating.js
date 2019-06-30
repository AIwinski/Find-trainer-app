import React from "react";
import PropTypes from "prop-types";

const Rating = ({ rating, numberOfRatings, minValue, maxValue }) => {
    const roundedRating = Math.round(rating);
    let stars = [];
    for (let i = minValue; i < maxValue + 1; i++) {
        stars.push(
            <span
                key={i}
                className={
                    "rating__star " +
                    (roundedRating >= i ? "rating__star--active" : "")
                }
            >
                &#9733;
            </span>
        );
    }
    return (
        <div className="rating">
            <span className="rating__value">{rating.toFixed(1)}</span>
            <div>
                {stars.map(s => {
                    return s;
                })}
            </div>
            <span className="rating__number">({numberOfRatings})</span>
        </div>
    );
};

Rating.propTypes = {
    numberOfRatings: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired
};

Rating.defaultProps = {
    minValue: 1,
    maxValue: 5,
    rating: 0,
    numberOfRatings: 0
}

export default Rating;
