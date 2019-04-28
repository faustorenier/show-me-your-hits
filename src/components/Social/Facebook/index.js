import React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";

const Facebook = () => {
    const shareUrl = "https://showmeyourhits.netlify.com";
    const title = "See what you've been listening so far on Spotify!";

    return (
        <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
        >
            <FacebookIcon size={32} round />
        </FacebookShareButton>
    );
}

export default Facebook;