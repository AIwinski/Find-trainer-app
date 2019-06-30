import React from "react";
import PropTypes from "prop-types";
import Rating from "../Rating";
import { Link } from "react-router-dom";

const Card = ({
    name,
    image,
    city,
    isPremium,
    description,
    numberOfRatings,
    rating,
    id
}) => {
    const profileURL = "/profile/" + id;
    return (
        <div className={"card " + (isPremium ? "card--premium" : "")}>
            <Link to={profileURL}>
                <div className="card__image">
                    <img src={image} />
                </div>
            </Link>
            <div className="card__content">
                <div className="card__left">
                    <span className="card__name">
                        <Link to={profileURL}>{name}</Link>
                    </span>
                    {isPremium && (
                        <span className="card__premium-tag"> &#10004;</span>
                    )}
                    <span className="card__city">{city}</span>
                    <p className="card__description">{description}</p>
                </div>
                <div className="card__right">
                    <Rating rating={rating} numberOfRatings={numberOfRatings} />
                    <Link to={profileURL}>Zobacz wiecej</Link>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    numberOfRatings: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
};

export default Card;
