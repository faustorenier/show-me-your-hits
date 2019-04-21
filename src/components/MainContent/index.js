import React from "react";
import "./styles.css"

const MainContent = ({ type, current, currentNum, totalNum, onChange }) => {

    const arrowClassForward = (currentNum < totalNum) ? "arrow active" : "arrow";
    const arrowClassBackward = (currentNum > 1) ? "arrow active" : "arrow";

    return (
        <div className="c__MainContent">

            <div className="c__MainContent_num">{currentNum}</div>
            <h1 className="c__MainContent_title">{current.name}</h1>

            <div className="c__MainContent_navigator">
                <div id="backward" className={arrowClassBackward} onClick={(e) => (currentNum > 1) && onChange(e.target.id)}></div>
                <div className="c__MainContent_counter hide-mobile">
                    <div className="c__MainContent_counter_curr">{currentNum}</div>
                    <div className="c__MainContent_counter_tot">/ {totalNum}</div>
                </div>
                <div id="forward" className={arrowClassForward} onClick={(e) => (currentNum < totalNum) && onChange(e.target.id)}></div>
            </div>

        </div>
    );
}

export default MainContent;