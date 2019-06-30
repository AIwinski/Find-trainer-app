import React from "react";
import { connect } from "react-redux";
import FilterForm from "./FilterForm";
import SortingForm from "./SortingForm";
import Card from "./Card";
import BottomScrollListener from "react-bottom-scroll-listener";

import { Profiles } from "../../agent";
import SpinLoader from "../SpinLoader";

class ProfileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            isFetching: true,
            allFetched: false
        };
    }

    componentDidMount() {
        Profiles.getProfiles(
            this.state.profiles.length,
            this.props.filters
        ).then(res => {
            console.log(res);

            const profiles = this.filterProfiles(res.data.profiles);
            this.setState({
                profiles: profiles,
                isFetching: false
            });
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filters !== this.props.filters) {
            console.log("update")
            this.setState({ allFetched: false }, () => {
                //this.tryFetchMore();
                this.filterProfilesInState();
            });
        }
    }

    filterProfilesInState = () => {
        this.setState({ profiles: this.filterProfiles(this.state.profiles)});
    }

    filterProfiles = (profiles) => { //to do add more filters
        let filteredProfiles = profiles
            .map(profile => profile._id)
            .filter((value, index, self) => self.indexOf(value) === index); //only unique in case there are two equal profiles

        filteredProfiles = filteredProfiles.filter(profile => {
            return profile.city === this.props.filters.city; //city
        });

        return profiles;
    };

    tryFetchMore = () => {
        if (!this.state.isFetching && !this.state.allFetched) {
            this.setState({ isFetching: true }, () => {
                Profiles.getProfiles(
                    this.state.profiles.length,
                    this.props.filters
                ).then(res => {
                    console.log(res);
                    const profiles = this.filterProfiles(res.data.profiles);

                    if (profiles.length === 0) {
                        this.setState({
                            allFetched: true,
                            isFetching: false
                        });
                    } else {
                        const stateProfiles = this.state.profiles;
                        profiles.forEach(p => {
                            stateProfiles.push(p);
                        });
                        console.log(stateProfiles);
                        this.setState({
                            profiles: stateProfiles,
                            isFetching: false
                        });
                        console.log(this.state);
                    }
                });
            });
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="list">
                    <div className="list__filters">
                        <FilterForm />
                    </div>
                    <div className="list__data">
                        {this.state.profiles.map(item => (
                            <Card
                                key={item._id}
                                name={item.first_name + " " + item.last_name}
                                image={item.avatar}
                                isPremium={item.is_premium}
                                city={item.city}
                                description={item.description}
                                numberOfRatings={item.number_of_ratings}
                                rating={item.rating}
                                id={item._id}
                            />
                        ))}
                        {this.state.isFetching && <SpinLoader />}
                        {this.state.allFetched && (
                            <h3>Sciagnieto wszystkie posty</h3>
                        )}
                    </div>
                    <div className="list__sorting">
                        <SortingForm />
                    </div>
                </div>
                <BottomScrollListener
                    onBottom={this.tryFetchMore}
                    offset={100}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return { filters: state.filters };
};

export default connect(
    mapStateToProps,
    null
)(ProfileList);
