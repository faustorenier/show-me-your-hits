import React from "react";
import { PoseGroup } from "react-pose";
import * as Pose from "../../utils/poses";
import Button from "../Button";
import "./styles.css";

const Modal = ({ data, close, isVisible }) => {
    const { image, message, link } = data;
    return (
        <PoseGroup>
            {isVisible && [
                <Pose.modal.bg key="anim-modal-shade" className="c__Modal_bg" onClick={close} />,
                <Pose.modal.content key="anim-modal-content" className="c__Modal_cont">
                    <div className="c__Modal_cont_wrap">
                        <div className="c__Modal_cont_close" onClick={close}>
                            <div className="c__Modal_cont_close_rect"></div>
                            <div className="c__Modal_cont_close_rect"></div>
                        </div>
                        <h1>{message}</h1>
                        <div className="c__Modal_cont_img">
                            <img src={image} alt="Playlist Cover" />
                        </div>
                        <a href={link}>
                            <Button title="Check this out!" />
                        </a>
                    </div>
                </Pose.modal.content>
            ]}
        </PoseGroup>
    );
}

export default Modal;