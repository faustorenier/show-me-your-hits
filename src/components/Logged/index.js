import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

const Logged = (props) => {
    return (
        <React.Fragment>
            <div className="c__Logged_top">
                <NavLink to="/artists">
                    <img src="./_assets/img/home_artists-bg.jpg" alt="" draggable="false" />
                    <h1>top artists</h1>
                </NavLink>
                <img className="c__Logged_id" src="/_assets/id.svg" alt="ShowMeYourHits" draggable="false" />
            </div>
            <div className="c__Logged_top">
                <NavLink to="/tracks">
                    <img id="tracks-main-bg" src="./_assets/img/home_tracks-bg.jpg" alt="" draggable="false" />
                    <h1>top tracks</h1>
                </NavLink>
            </div>
        </React.Fragment>
    );
}

export default Logged;