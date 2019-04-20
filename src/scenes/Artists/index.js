import React, { Component } from "react";
import MainImg from "../../components/MainImg";
import MainContent from "../../components/MainContent";
import Queque from "../../components/Queque";
import nav from "../../utils/extra/navigation";
import "./styles.css";

class Artists extends Component {

    constructor(props) {
        super();
        this.state = {
            artists: props.artists,
            current: 0,
            total: props.artists.length,
            user: props.user
        }
        props.handleMainNav(props.location.pathname.slice(1));
    }

    handleChange = direction => {
        const current = nav(direction, this.state.current, this.state.total);
        this.setState({ current });
    }

    render() {
        const { artists, current, total, user } = this.state;
        return (
            <React.Fragment>
                <div className="page" id="artists" style={{ backgroundColor: "red" }}>
                    <MainImg
                        current={artists[current]}
                        user={user}
                    />
                    <MainContent
                        type={"artists"}
                        current={artists[current]}
                        currentNum={current + 1}
                        totalNum={total}
                        onChange={this.handleChange}
                    />
                </div>
            </React.Fragment>
        );
    }

}

export default Artists;