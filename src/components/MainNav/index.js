import React from "react";
import { NavLink } from "react-router-dom";
// import { PoseGroup } from "react-pose";
// import * as Anim from "../pose/Anim";
import Twitter from "../Social/Twitter";
import "./styles.css"

const MainNav = ({ isVisible }) => {
    return (
        isVisible &&
        <div className="c__mainNav">
            {/* <img className="c__mainNav_id" src="/_assets/id-neg.svg" alt="ShowMeYourHits" draggable="false" /> */}
            <div className="c__mainNav_item">
                <p className="hide-mobile">Top:</p>
                <nav>
                    <NavLink to="/artists">Artists</NavLink>
                    <NavLink to="/tracks">Tracks</NavLink>
                </nav>
            </div>
            <div className="c__mainNav_item">
                <p className="hide-mobile">Share:</p>
                <div className="c__mainNav_share">
                    <Twitter />
                </div>
            </div>
        </div>
    );
}

export default MainNav;