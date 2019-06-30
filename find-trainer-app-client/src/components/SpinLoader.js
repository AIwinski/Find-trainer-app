import React from "react";

const SpinLoader = props => (
    <div className="spin-loader__container">
        <div className="lds-ring">
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
);

export default SpinLoader;
