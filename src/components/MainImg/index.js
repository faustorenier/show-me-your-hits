import React from "react";
import "./styles.css";

function capitalize(str) {
    const arr = str.split(" ");
    const final = arr.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return final.join(" ")
}

const MainImg = ({ name, img, genre, user }) => {

    return (
        <div className="c__MainImg">
            <img src={img} alt={name} className="c__MainImg_main" draggable="false" />
            <a href={user.uri}>
                <img src={user.imgUrl} alt={user.name} className="c__MainImg_profile" draggable="false" />
            </a>
            <span className="c__MainImg_genre"><p>{capitalize(genre)}</p></span>
        </div>
    );
}

export default MainImg;