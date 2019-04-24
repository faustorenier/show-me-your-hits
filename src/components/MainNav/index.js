import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// import { PoseGroup } from "react-pose";
// import * as Anim from "../pose/Anim";
import * as Pose from "../../utils/poses";
import keys from "../../utils/poses/keys.json";

import Twitter from "../Social/Twitter";
import "./styles.css"

class MainNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
    }

    componentDidMount() {
        this.setState({ isVisible: true });
    }

    render() {
        return (
            <Pose.Nav key={keys.components.mainNav} pose={this.state.isVisible ? "visible" : "hidden"} className="c__mainNav">
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
            </Pose.Nav>
        );
    }
}

export default MainNav;