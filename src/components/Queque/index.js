import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import handleFinal from "./utils/final";
import "./styles.css"

const Queque = ({ type, queque, name, handlePlaylist }) => {
    const final = handleFinal(type);
    return (
        <div className="c__Queque">
            <div className="c__Queque_preview">
                {(type === "artists") && queque.map((artist, i) => <img key={i} src={artist.images[0].url} alt={artist.name} className="float" draggable={false} />)}
                {(type === "tracks") && queque.map((track, i) => <img key={i} src={track.album.images[0].url} alt={track.name} className="float" draggable={false} />)}
                {queque.length === 0 && <div className="c__Queque_msg">
                    <h1>{final.message}</h1>
                    <NavLink className="c__Queque_msg_cta" to={final.link}>{final.cta}</NavLink>
                </div>}
            </div>
            <div className="c__Queque_playlist">
                <p>Hey {name}, wanna make a killer Playlist?</p>
                <div className="c__Queque_button_container" onClick={handlePlaylist}>
                    <Button title="Create Playlist" />
                </div>
            </div>
        </div>
    );
}

export default Queque;





