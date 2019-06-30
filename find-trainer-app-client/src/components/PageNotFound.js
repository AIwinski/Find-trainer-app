import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = props => (
    <div className="not-found">
        <div className="not-found__text">Nie znaleziono strony</div>
        <Link to="/" className="not-found__link">Wróc do strony glownej</Link>
    </div>
);

export default PageNotFound;
