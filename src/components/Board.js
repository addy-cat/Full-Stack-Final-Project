import React from 'react'
import Tile from './Tile.js'
import {Piece} from './Piece.js'
import {p} from './Piece.js';
import PlayerInfoCard  from './PlayerInfoCard.js';
import {io} from 'socket.io-client';

class Board extends React.Component {

    constructor(props){
        super(props);
        let myColor = "white";
        let theirColor = "black";
        this.state = {
            myColor: myColor,
            theirColor: theirColor,
            firstSelect: null,
            username: null,
            room: null,
            boardState: [
                [new Piece(p.rook, theirColor), new Piece(p.knight, theirColor), new Piece(p.bishop, theirColor), new Piece(p.king, theirColor), new Piece(p.queen, theirColor), new Piece(p.bishop, theirColor), new Piece(p.knight, theirColor), new Piece(p.rook, theirColor)],
                [new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor)],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor)],
                [new Piece(p.rook, myColor), new Piece(p.knight, myColor), new Piece(p.bishop, myColor), new Piece(p.king, myColor), new Piece(p.queen, myColor), new Piece(p.bishop, myColor), new Piece(p.knight, myColor), new Piece(p.rook, myColor)],
            ], 
            socket: io(`http://${window.location.hostname}:3000`),
        };

        this.state.socket.on("move", (data) => {
            let message = JSON.parse(data);
            let from = message.from;
            let to = message.to;
            this.setState((prevState) => {
                let tempState = prevState;
                let prev = tempState.boardState[from[0]][from[1]];
                tempState.boardState[to[0]][to[1]] = new Piece(prev.piece, prev.color);
                tempState.boardState[from[0]][from[1]] = null;
                return tempState;
            })
        }); 

        this.onSelect = this.onSelect.bind(this);
        this.generateRows = this.generateRows.bind(this);
        this.generateTiles = this.generateTiles.bind(this);
        this.setUserRoom = this.setUserRoom.bind(this);
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
        else {
            this.setState((prevState) => {
                let tempState = prevState;
                let prev = tempState.boardState[prevState.firstSelect[0]][prevState.firstSelect[1]];
                tempState.boardState[i][j] = new Piece(prev.piece, prev.color);
                tempState.boardState[prevState.firstSelect[0]][prevState.firstSelect[1]] = null;
                this.state.socket.emit("message", JSON.stringify({
                    username: tempState.username, 
                    room: tempState.room, 
                    requestType: "move", 
                    from: [prevState.firstSelect[0], prevState.firstSelect[1]],
                    to: [i, j]
                 }));
                tempState.firstSelect = null;
                    
                return tempState;
            });
        }
    }

    setUserRoom(u, r){
        this.setState({
            username: u,
            room: r,
        });
    }

    generateTiles(colNum){
        return this.state.boardState[colNum].map((col, index) => {
            return <Tile key={col} onSelect={this.onSelect} piece={col} row={index} col={colNum} color={(index + colNum) % 2 === 0 ? "black" : "white"}/>
        });
    }

    generateRows(){
        return this.state.boardState.map((row, index) => {
            return <li key={[row, index]} style={{paddingLeft: "100px"}}>{this.generateTiles(index)}</li>
        });
    }

    render() {
        return(
            <div class="container">
           
                <div class="col-sm" style={{right: "0%", left: "-30%"}}>
                    <div>
                    <ul style={{listStyle:"none"}}>{this.generateRows()}</ul>
                    </div>
                </div>
                
            < PlayerInfoCard socket={this.state.socket} setUserRoom={this.setUserRoom}/>
            
            </div>
        )
    }
}
export default Board