import React, { Component } from "react";
import MainImg from "../../components/MainImg";
import MainContent from "../../components/MainContent";
import Queque from "../../components/Queque";
import nav from "../../utils/extra/navigation";
import getQueque from "../../utils/extra/getQueque";
import * as Pose from "../../utils/poses";
import keys from "../../utils/poses/keys.json";
import "./styles.css";

class Tracks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            type: props.type,
            items: props.data,
            current: 0,
            total: props.data.length,
            queque: getQueque(props.data, props.data[0]),
            user: props.user
        }
        props.handleMainNav(props.location.pathname.slice(1));
    }

    componentDidMount() {
        this.setState({ isVisible: true });
        localStorage.removeItem("syh_access_token");
    }

    handleChange = direction => {
        const current = nav(direction, this.state.current, this.state.total);
        const queque = getQueque(this.state.items, this.state.items[current]);
        this.setState({ current: current, queque: queque });
    }

    render() {
        const { isVisible, type, items, current, total, queque, user } = this.state;

        return (
            <React.Fragment>
                <Pose.Main key={keys.scenes.tracks} pose={isVisible ? "visible" : "hidden"} className="s__Tracks">
                    <div className="s__Tracks_container">
                        <MainImg
                            name={items[current].name}
                            img={type === "artists" ? items[current].images[0].url : items[current].album.images[0].url}
                            genre={type === "artists" ? items[current].genres[0] : items[current].genre}
                            user={user}
                        />
                        <MainContent
                            current={items[current]}
                            currentNum={current + 1}
                            totalNum={total}
                            onChange={this.handleChange}
                        />
                    </div>
                    <Queque
                        type={type}
                        queque={queque}
                        name={user.name}
                        handlePlaylist={() => this.props.handlePlaylist("seed_artists")}
                    />
                </Pose.Main>
            </React.Fragment>
        );
    }

}

export default Tracks;