import React from "react";
import LoginBtn from "../LoginBtn";
import "./styles.css";

const Logger = ({ handleLogin }) => {
    return (
        <React.Fragment>
            <div className="c__Logger_sx">
                <div className="c__Logger_id">
                    <img src="/_assets/id.svg" alt="ShowMeYourHits" draggable="false" />
                </div>
                <div className="c__Logger_content">
                    <h1>Find out what you've been listening!</h1>
                    <p>Charts of artists and tracks you have listened the most! You can also create neat Playlists from the results!</p>
                    <LoginBtn onClick={handleLogin} />
                </div>
            </div>
            <div className="c__Logger_dx">
                <img src="/_assets/img/home_login-bg.jpg" alt="Sign in with Spotify" draggable="false" />
            </div>
        </React.Fragment>
    );
}

export default Logger;