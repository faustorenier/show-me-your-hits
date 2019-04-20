import React, { Component } from "react";
import Logger from "../../components/Logger";
import Logged from "../../components/Logged";
import "./styles.css";

class Home extends Component {

    componentDidMount() {
        this.props.handleMainNav(this.props.location.pathname);
    }

    handleLogin() {
        window.location.href = window.location.href.includes("localhost")
            ? "http://localhost:8888/login"
            : "https://makemyplaylist-bridge.herokuapp.com/login"
    }

    render() {
        const { showLogin } = this.props;
        return (
            <div className="page" id="home">
                {showLogin && <Logger handleLogin={this.handleLogin} />}
                {!showLogin && <Logged />}
            </div>
        );
    }
}

export default Home;