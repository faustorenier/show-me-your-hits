import React from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";

const Twitter = () => {
    const shareUrl = "https://showmeyourhits.netlify.com";
    const title = "See what you've been listening so far on Spotify!";
    const hashtags = ["Spotify", "ShowMeYourHits"];

    return (
        <TwitterShareButton
            className="Demo__some-network__share-button"
            url={shareUrl}
            title={title}
            hashtags={hashtags}
        >
            <TwitterIcon size={32} round />
        </TwitterShareButton>
    );
}

export default Twitter;