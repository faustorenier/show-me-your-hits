import React from "react";
import "./styles.css";

const LoginBtn = ({ onClick }) => {
    return (
        <div className="c__LoginBtn" onClick={onClick}>
            <span><img src="/_assets/spotify-icon.svg" alt="Spotify" /></span>
            <div>Sign in with Spotify</div>
        </div>
    );
}

export default LoginBtn;