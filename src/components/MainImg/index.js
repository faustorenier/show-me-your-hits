import React from "react";
import "./styles.css";

function capitalize(str) {
    const arr = str.split(" ");
    const final = arr.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return final.join(" ")
}

const MainImg = ({ current, user }) => {

    return (
        <div className="c__MainImg">
            <img src={current.images[0].url} alt={current.name} className="c__MainImg_main" draggable="false" />
            <a href={user.uri}>
                <img src={user.imgUrl} alt={user.name} className="c__MainImg_profile" draggable="false" />
            </a>
            <span className="c__MainImg_genre"><p>{capitalize(current.genres[0])}</p></span>
        </div>
    );
}

export default MainImg;