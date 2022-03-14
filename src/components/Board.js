import React from 'react'
import Tile from './Tile.js'
import {Piece, p} from './Piece.js'
import PlayerInfoCard  from './PlayerInfoCard.js';
import PopUp from './PopUp.js';
import Error from './Error.js';
import ChoosePiece from './ChoosePiece.js';
import Turn from './Turn';
import {io} from 'socket.io-client';
import YouWin from './YouWin.js';
import YouLose from './YouLose.js'

class Board extends React.Component {

    constructor(props){
        super(props);
        let myColor = "white";
        let theirColor = "black";
        this.state = {
            myColor: myColor,
            theirColor: theirColor,
            firstSelect: null,
            user: null,
            room: null,
            boardState: [
                [new Piece(p.rook, theirColor), new Piece(p.knight, theirColor), new Piece(p.bishop, theirColor), new Piece(p.queen, theirColor), new Piece(p.king, theirColor), new Piece(p.bishop, theirColor), new Piece(p.knight, theirColor), new Piece(p.rook, theirColor)],
                [new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor)],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor)],
                [new Piece(p.rook, myColor), new Piece(p.knight, myColor), new Piece(p.bishop, myColor), new Piece(p.queen, myColor), new Piece(p.king, myColor), new Piece(p.bishop, myColor), new Piece(p.knight, myColor), new Piece(p.rook, myColor)],
            ], 
            socket: io(`http://${window.location.hostname}:3001`),
            showWaitingMessage: false,
            error: null, 
            showPieceSelector: null,
            turn: true, 
            winCondition: false,
            loseCondition: false
        };

        this.state.socket.on("error", (data) => {
            let message = JSON.parse(data);
            this.setState({
                error: message.error
            });
        });

        this.state.socket.on('promote', (data) => {
            let message = JSON.parse(data);
            let tempBoard = this.state.boardState;
            tempBoard[message.promote[0]][message.promote[1]].piece = message.piece;
            this.setState({
                boardState: tempBoard
            })
        });

        this.state.socket.on("joinRoom", (data) => {
            let message = JSON.parse(data);
            if(message.user2 === true){
                //When WE join a room that another player has made, invert the colors of the board for us and set our turn to be false
                //Whoever creates the room goes first.
                let tempBoard = this.state.boardState.map(row => {
                    return row.map((piece)=>{
                        return piece == null ? null : new Piece(piece.piece, piece.color === "white" ? "black" : "white"); 
                    })
                });

                let temp = tempBoard[0][3];
                tempBoard[0][3] = tempBoard[0][4];
                tempBoard[0][4] = temp;
                temp = tempBoard[7][3];
                tempBoard[7][3] = tempBoard[7][4];
                tempBoard[7][4] = temp;
                this.setState({
                    boardState: tempBoard, 
                    myColor: this.state.theirColor,
                    theirColor: this.state.myColor, 
                    turn: false
                });
            }

            if(message.success === "joined"){
                this.setState({
                    showWaitingMessage: false
                });
            }
            else {
                this.setState({
                    showWaitingMessage: true
                });
            }
        })


        this.state.socket.on("move", (data) => {
            let message = JSON.parse(data);
            let from = message.from;
            let to = message.to;
            let loseCondition = false;
            if(this.state.boardState[to[0]][to[1]] && this.state.boardState[to[0]][to[1]].piece === p.king){
                loseCondition = true;
            }
            this.setState((prevState) => {
                let tempState = prevState;
                let prev = tempState.boardState[from[0]][from[1]];
                tempState.boardState[to[0]][to[1]] = new Piece(prev.piece, prev.color);
                tempState.boardState[from[0]][from[1]] = null;
                tempState.turn = true;
                return tempState;
            })
            if(loseCondition){
                this.setState({
                    loseCondition: true
                });
            }
        }); 

        this.onSelect = this.onSelect.bind(this);
        this.generateRows = this.generateRows.bind(this);
        this.generateTiles = this.generateTiles.bind(this);
        this.setUserRoom = this.setUserRoom.bind(this);
        this.getChosenPiece = this.getChosenPiece.bind(this);
        this.setTheme = this.setTheme.bind(this);
    }

    getChosenPiece(piece){
        let tempBoard = this.state.boardState;
        tempBoard[this.state.showPieceSelector[0]][this.state.showPieceSelector[1]].piece = piece;
        this.state.socket.emit('promote', JSON.stringify({user: this.state.user, room: this.state.room, promote: this.convertMove(this.state.showPieceSelector[0], this.state.showPieceSelector[1]), piece: piece}));
        this.setState({
            boardState: tempBoard,
            showPieceSelector: null
        });
    }

    onSelect(i, j){
        if(this.state.firstSelect == null){
            this.setState((prevState) => {
                let tempState = prevState;
                if(tempState.boardState[i][j] != null)
                    tempState.firstSelect = [i, j];
                return tempState;
            });
        }
        else if(i !== this.state.firstSelect[0] || j !== this.state.firstSelect[1]) {
            let firstSelect = this.state.firstSelect;
            let prev = this.state.boardState[firstSelect[0]][firstSelect[1]];
            if(this.state.turn && 
               prev.color === this.state.myColor &&
               (this.state.boardState[i][j] === null || this.state.boardState[i][j].color === this.state.theirColor) &&
               prev.validateMove(i, j, firstSelect[0], firstSelect[1], this.state.boardState[i][j])){
                if(prev.piece === p.pawn && i === 0){
                    this.setState({
                        showPieceSelector: [i, j]
                    });
                }
                let winCondition = false;
                if(this.state.boardState[i][j] && this.state.boardState[i][j].piece === p.king) {
                    winCondition = true;
                }

                this.setState((prevState) => {
                    let tempState = prevState;
                    tempState.boardState[i][j] = new Piece(prev.piece, prev.color);
                    tempState.boardState[firstSelect[0]][firstSelect[1]] = null;
                    let f = this.convertMove(firstSelect[0], firstSelect[1]);
                    let t = this.convertMove(i, j);
                    this.state.socket.emit("move", JSON.stringify({
                        user: tempState.user, 
                        room: tempState.room, 
                        from: f,
                        to: t
                    }));
                    tempState.firstSelect = null;
                    tempState.turn = false;    
                    return tempState;
                });

                if(winCondition){
                    this.setState({
                        winCondition: true
                    })
                }

            }
            else {
                this.setState({
                    firstSelect: null
                });
            }
        }
    }

    convertMove(i, j){
        return [7 - i, 7 - j];
    }

    setUserRoom(u, r){
        this.setState({
            user: u,
            room: r,
        });
    }

    generateTiles(colNum){
        return this.state.boardState[colNum].map((col, index) => {
            return <Tile key={index} onSelect={this.onSelect} piece={col} row={index} col={colNum} image={(index + colNum) % 2 === 1 ? "dark_tile.jpg" : "light_tile.jpg"}/>
        });
    }

    generateRows(){
        return this.state.boardState.map((row, index) => {
            return <li key={[row, index]} style={{paddingLeft: "100px", marginBottom: "-6px"}}>{this.generateTiles(index)}</li>
        });
    }

    setTheme(theme){
        this.props.setTheme(theme);
    }

    render() {
        return(
           
            <div className="container" >
                <div className="row">
                    <div className="col-lg" style={{zIndex: "2", right: "29%", paddingTop: "3%"}}>
                        <div style={{width: "200%"}}>
                        {this.state.winCondition === true ? <YouWin /> : null}
                        {this.state.loseCondition === true ? <YouLose /> : null} 
                        {this.state.error != null ? <Error error_msg={this.state.error}/> : null}
                        {this.state.showWaitingMessage ? <PopUp/> : null}
                        <ul style={{listStyle:"none"}}>{this.generateRows()}</ul>
                        </div>
                    </div>
                    <div className="col-sm">
                        {this.state.showPieceSelector !== null ? <ChoosePiece getPiece={this.getChosenPiece} /> : null}
                        <Turn turn={this.state.turn ? "Your turn" : "Their turn"}/>
                        <PlayerInfoCard setTheme={this.setTheme} socket={this.state.socket} setUserRoom={this.setUserRoom}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Board