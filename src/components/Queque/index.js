import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css"

const Queque = ({ type, queque, name, handlePlaylist }) => {
    return (
        <div className="c__Queque">
            <div className="c__Queque_preview">
                {(type === "artists") && queque.map((artist, i) => <img key={i} src={artist.images[0].url} alt={artist.name} className="float" draggable={false} />)}
                {queque.length === 0 && <div className="c__Queque_msg">
                    <h1>What about the best tracks? :O</h1>
                    <NavLink className="cta" to="/tracks">See top tracks</NavLink>
                </div>}
            </div>
            <div className="c__Queque_playlist">
                <p>Hey {name}, wanna make a killer Playlist?</p>
                <div className="btn" onClick={handlePlaylist}>Create Playlist</div>
            </div>
        </div>
    );
}

export default Queque;





