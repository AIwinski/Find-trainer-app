import React from "react";
import { Profiles } from "../../agent";
import Rating from "../Rating";
import { Link } from "react-router-dom";
import PriceList from "./PriceList";
import ImageGallery from "./ImageGallery";
import ReviewForm from "./Reviews/ReviewForm";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: null
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        Profiles.getProfile(id).then(res => {
            console.log(res.data);
            this.setState({ profile: res.data.profile });
        });
    }

    render() {
        let profile = this.state.profile;

        return (
            <div className="profile-wrapper container-fluid">
                {profile ? (
                    <React.Fragment>
                        <div className="profile-main">
                            <img
                                src={profile.avatar}
                                className="profile-main__image"
                            />
                            <div className="profile-main__info-wrapper">
                                <div className="profile-main__info-inner">
                                    <div className="profile-main__name">
                                        {profile.first_name +
                                            " " +
                                            profile.last_name}
                                    </div>
                                    <div className="profile-main__city">
                                        {profile.city}
                                    </div>
                                    <div className="profile-main__address">
                                        {profile.address}
                                    </div>
                                </div>
                                <div className="profile-main__info-inner profile-main__info-inner--right">
                                    <div className="profile-main__rating">
                                        <Rating
                                            rating={profile.rating}
                                            numberOfRatings={
                                                profile.numberOfRatings
                                            }
                                        />
                                    </div>
                                    <div className="profile-main__contact">
                                        <Link to={`/chat/${profile._id}`}>
                                            contact
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-image-gallery">
                            {/* <ImageGallery images={profile.images} /> */}
                        </div>
                        <div className="profile-description">
                            {profile.description}
                        </div>
                        <div className="profile-price-list">
                            {/* <PriceList price_list={profile.price_list} /> */}
                        </div>
                        <div className="profile-reviews">
                            <ReviewForm />
                        </div>
                    </React.Fragment>
                ) : (
                    <div>loading</div>
                )}
            </div>
        );
    }
}

export default Profile;
