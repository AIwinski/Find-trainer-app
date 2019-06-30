import React from "react";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
    barColors: {
        "0": "#00ff7b",
        "1.0": "#00c020"
    },
    shadowBlur: 0
});

const Loader = () => {
    return <TopBarProgress />;
};

export default Loader;
