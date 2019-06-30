import React, { Component } from "react";
import DebouncedSearchInput from "./DebouncedSearchInput";

import { Search } from "../agent";

export default class Home extends Component {
    render() {
        return (
            <div className="hero">
                <div className="container-fluid">
                    <div className="hero__inner">
                        <DebouncedSearchInput
                            name="search"
                            placeholder="search"
                            callback={string => {
                                console.log(string);
                            }}
                            delay={500}
                            dataSource={Search.searchCities}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
