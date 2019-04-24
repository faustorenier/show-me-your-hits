import React, { Component } from "react";
import Logger from "../../components/Logger";
import Logged from "../../components/Logged";
import * as Pose from "../../utils/poses";
import keys from "../../utils/poses/keys.json";
import "./styles.css";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { isVisible: false }
        this.props.handleMainNav(this.props.location.pathname);
    }

    componentDidMount() {
        this.setState({ isVisible: true });
    }

    handleLogin() {
        window.location.href = window.location.href.includes("localhost")
            ? "http://localhost:8888/login"
            : "https://showmeyourhitsbridge.herokuapp.com/login"
    }

    render() {
        const { showLogin } = this.props;
        return (
            <Pose.Main key={keys.scenes.home} pose={this.state.isVisible ? "visible" : "hidden"} className="page" id="home">
                {showLogin && <Logger handleLogin={this.handleLogin} />}
                {!showLogin && <Logged />}
            </Pose.Main>
        );
    }
}

export default Home;