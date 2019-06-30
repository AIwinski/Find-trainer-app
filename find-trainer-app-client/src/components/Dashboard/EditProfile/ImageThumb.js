import React from "react";

class ImageThumb extends React.Component {
    state = {
        thumb: undefined
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.image) {
            return;
        }

        if (typeof nextProps.image === "string") {
            this.setState({ thumb: nextProps.image });
        } else {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.image);
        }
    }

    render() {
        const { image } = this.props;
        const { thumb } = this.state;

        if (!image) {
            return null;
        }

        return <img src={thumb} alt="thumbnail" className="img-thumbnail" />;
    }
}

export default ImageThumb;
