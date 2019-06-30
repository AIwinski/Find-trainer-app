import React from "react";
import PropTypes from "prop-types";

class RatingInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.maxValue,
            visibleValue: props.maxValue
        };
    }

    render() {
        let stars = [];
        for (let i = this.props.minValue; i < this.props.maxValue + 1; i++) {
            stars.push(
                <span
                    key={i}
                    className={
                        "rating__star " +
                        (this.state.visibleValue >= i
                            ? "rating__star--active"
                            : "")
                    }
                    onClick={() => {
                        this.setState({ value: i }, () => {
                            this.props.cb(i);
                        });
                    }}
                    onMouseEnter={() => this.setState({ visibleValue: i })}
                    onMouseLeave={() =>
                        this.setState({ visibleValue: this.state.value })
                    }
                >
                    &#9733;
                </span>
            );
        }
        return (
            <div className="rating-input">
                <div>
                    {stars.map(s => {
                        return s;
                    })}
                </div>
                <div className="rating-input__value" />
            </div>
        );
    }
}

RatingInput.defaultProps = {
    minValue: 1,
    maxValue: 5
};

RatingInput.propTypes = {
    cb: PropTypes.func.isRequired,
    minValue: PropTypes.number,
    maxValue: PropTypes.number
};

export default RatingInput;