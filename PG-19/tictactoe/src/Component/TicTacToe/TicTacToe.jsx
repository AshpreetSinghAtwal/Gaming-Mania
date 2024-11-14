import React, { Component } from "react";
import Grid from "./Grid";
import "./TicTacToe.css";

class TicTacToe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array(9).fill(""),
            turn: "X",
            isGameOver: false,
            result: "",
            winningLine: [],
        };
    }

    winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    handleBoxClick = (index) => {
        const { board, turn, isGameOver } = this.state;

        if (isGameOver || board[index] !== "") return;

        const newBoard = [...board];
        newBoard[index] = turn;

        if (this.checkWin(newBoard)) {
            this.setState({
                board: newBoard,
                isGameOver: true,
                result: `${turn} wins!`,
            });
        } else if (this.checkDraw(newBoard)) {
            this.setState({
                board: newBoard,
                isGameOver: true,
                result: "It's a draw!",
            });
        } else {
            this.setState({
                board: newBoard,
                turn: turn === "X" ? "O" : "X",
            });
        }
    };

    checkWin = (board) => {
        for (let condition of this.winConditions) {
            const [a, b, c] = condition;
            if (
                board[a] &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                this.setState({ winningLine: condition });
                return true;
            }
        }
        return false;
    };

    checkDraw = (board) => {
        return board.every((box) => box !== "");
    };

    resetGame = () => {
        this.setState({
            board: Array(9).fill(""),
            turn: "X",
            isGameOver: false,
            result: "",
            winningLine: [],
        });
    };

    render() {
        const { board, turn, isGameOver, result, winningLine } = this.state;

        return (
            <div className="body">
                <div className="turn-container">
                    <h3>Turn For</h3>
                    <div className={`turn-box align ${turn === "X" ? "active" : ""}`}>X</div>
                    <div className={`turn-box align ${turn === "O" ? "active" : ""}`}>O</div>
                    <div className="bg" style={{ left: turn === "X" ? "0" : "85px" }}></div>
                </div>
                <Grid board={board} onBoxClick={this.handleBoxClick} winningLine={winningLine} />
                <h2 id="results">{result}</h2>
                {isGameOver && (
                    <button id="play-again" onClick={this.resetGame}>
                        Play Again
                    </button>
                )}
            </div>
        );
    }
}

export default TicTacToe;
