import React from "react";
import "./styles.css";

const Modal = ({ data, close }) => {
    const { image, message, link } = data;

    return (
        <div className="c__Modal">
            <div className="c__Modal_bg">
            </div>
            <div className="c__Modal_content">
                <div className="c__Modal_content_wrapper">
                    <div className="c__Modal_close" onClick={close}>
                        <div className="c__Modal_close_rect"></div>
                        <div className="c__Modal_close_rect"></div>
                    </div>
                    <h1>{message}</h1>
                    <img src={image} alt="Playlist Cover"></img>
                    <a href={link}>
                        <div className="btn">Check this out!</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Modal;