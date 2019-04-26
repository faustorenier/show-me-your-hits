import React from "react";
import { PoseGroup } from "react-pose";
import * as Pose from "../../utils/poses";
import Button from "../Button";
import "./styles.css";

const Modal = ({ data, close, isVisible }) => {
    const { type, message, link, cta, image } = data;
    const handleBgClick = () => {
        if (type === "error") {
            return window.location.href = "/";
        }
        close();
    }

    return (
        <PoseGroup>
            {isVisible && [
                <Pose.modal.bg key="anim-modal-shade" className="c__Modal_bg" onClick={handleBgClick} />,

                <Pose.modal.content key="anim-modal-content" className="c__Modal_anim">
                    <div className="c__Modal_anim_wrap">

                        <div className="c__Modal_cont">
                            <div className="c__Modal_cont_wrap">
                                <div className="c__Modal_cont_close" onClick={close}>
                                    <div className="c__Modal_cont_close_rect"></div>
                                    <div className="c__Modal_cont_close_rect"></div>
                                </div>
                                <h1>{message}</h1>
                                <div className="c__Modal_cont_img">
                                    {image && <img src={image} alt="Playlist Cover" />}
                                </div>
                                <a href={link}>
                                    <Button title={cta} />
                                </a>
                            </div>
                        </div>

                    </div>
                </Pose.modal.content>
            ]}
        </PoseGroup>
    );
}

export default Modal;