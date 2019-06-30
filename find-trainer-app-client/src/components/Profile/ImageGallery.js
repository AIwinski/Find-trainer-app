import React from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class ImageGallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalImageIndex: 0,
            isImageModalOpened: false
        };
    }

    onImageClick = index => {
        this.setState({
            isImageModalOpened: true,
            modalImageIndex: index
        });
    };

    render() {
        const { images } = this.props;
        return (
            <div className="gallery">
                <div className="gallery__container">
                    {images.map((src, index) => (
                        <div
                            className="gallery__image--small"
                            onClick={() => this.onImageClick(index)}
                            key={index}
                        >
                            <img src={src} alt="gallery element" />
                        </div>
                    ))}
                </div>
                {this.state.isImageModalOpened && (
                    <Lightbox
                        mainSrc={images[this.state.modalImageIndex]}
                        nextSrc={
                            images[
                                (this.state.modalImageIndex + 1) % images.length
                            ]
                        }
                        prevSrc={
                            images[
                                (this.state.modalImageIndex +
                                    images.length -
                                    1) %
                                    images.length
                            ]
                        }
                        onCloseRequest={() =>
                            this.setState({
                                isImageModalOpened: false
                            })
                        }
                        onMovePrevRequest={() =>
                            this.setState({
                                modalImageIndex:
                                    (this.state.modalImageIndex +
                                        images.length -
                                        1) %
                                    images.length
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                modalImageIndex:
                                    (this.state.modalImageIndex + 1) %
                                    images.length
                            })
                        }
                        animationDuration={0}
                    />
                )}
            </div>
        );
    }
}

export default ImageGallery;
