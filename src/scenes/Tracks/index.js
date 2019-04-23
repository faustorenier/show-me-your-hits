import React, { Component } from "react";
import MainImg from "../../components/MainImg";
import MainContent from "../../components/MainContent";
import Queque from "../../components/Queque";
import nav from "../../utils/extra/navigation";
import getQueque from "../../utils/extra/getQueque";
import "./styles.css";

class Tracks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks: props.tracks,
            current: 0,
            total: props.tracks.length,
            queque: getQueque(props.tracks, props.tracks[0]),
            user: props.user
        }
        props.handleMainNav(props.location.pathname.slice(1));
    }

    handleChange = direction => {
        const current = nav(direction, this.state.current, this.state.total);
        const queque = getQueque(this.state.tracks, this.state.tracks[current]);
        this.setState({ current: current, queque: queque });
    }

    render() {
        const { tracks, current, total, user, queque } = this.state;
        return (
            <React.Fragment>
                <div className="page" id="artists">
                    <div className="s__Artists_main_container">
                        <MainImg
                            name={tracks[current].name}
                            img={tracks[current].album.images[0].url}
                            genre={tracks[current].genre}
                            user={user}
                        />
                        <MainContent
                            type={"tracks"}
                            current={tracks[current]}
                            currentNum={current + 1}
                            totalNum={total}
                            onChange={this.handleChange}
                        />
                    </div>
                    <Queque
                        type={"tracks"}
                        queque={queque}
                        name={user.name}
                        handlePlaylist={() => this.props.handlePlaylist("seed_artists")}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default Tracks;