import React from "react";

const Grid = ({ board, onBoxClick, winningLine }) => {
    return (
        <div className="main-grid">
            {board.map((value, index) => (
                <div
                    key={index}
                    className={`box align ${
                        winningLine.includes(index) ? "highlight" : ""
                    }`}
                    onClick={() => onBoxClick(index)}
                >
                    {value}
                </div>
            ))}
        </div>
    );
};

export default Grid;
