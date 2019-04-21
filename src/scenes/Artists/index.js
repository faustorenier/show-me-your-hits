import React, { Component } from "react";
import MainImg from "../../components/MainImg";
import MainContent from "../../components/MainContent";
import Queque from "../../components/Queque";
import nav from "../../utils/extra/navigation";
import getQueque from "../../utils/extra/getQueque";
import "./styles.css";

class Artists extends Component {

    constructor(props) {
        super();
        this.state = {
            artists: props.artists,
            current: 0,
            total: props.artists.length,
            queque: getQueque(props.artists, props.artists[0]),
            user: props.user
        }
        props.handleMainNav(props.location.pathname.slice(1));
    }

    handleChange = direction => {
        const current = nav(direction, this.state.current, this.state.total);
        const queque = getQueque(this.state.artists, this.state.artists[current]);
        this.setState({ current: current, queque: queque });
    }

    render() {
        const { artists, current, total, user, queque } = this.state;

        return (
            <React.Fragment>
                <div className="page" id="artists">

                    <div className="s__Artists_main_container">
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
                    <Queque
                        type={"artists"}
                        queque={queque}
                        name={user.name}
                        handlePlaylist={() => this.props.handlePlaylist("seed_artists")}
                    />
                </div>
            </React.Fragment>
        );
    }

}

export default Artists;