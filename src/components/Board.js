import React from 'react'
import Tile from './Tile.js'
import {Piece} from './Piece.js'
import {p} from './Piece.js';
import PlayerInfoCard  from './PlayerInfoCard.js';
import PopUp from './PopUp.js';
import Error from './Error.js';
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
            user: null,
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
            socket: io(`http://${window.location.hostname}:3001`),
            showWaitingMessage: false,
            error: null
        };

        this.state.socket.on("error", (data) => {
            let message = JSON.parse(data);
            this.setState({
                error: message.error
            });
        })

        this.state.socket.on("joinRoom", (data) => {
            let message = JSON.parse(data);
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
        else if(i !== this.state.firstSelect[0] || j !== this.state.firstSelect[1]) {
            this.setState((prevState) => {
                let tempState = prevState;
                let prev = tempState.boardState[prevState.firstSelect[0]][prevState.firstSelect[1]];
                tempState.boardState[i][j] = new Piece(prev.piece, prev.color);
                tempState.boardState[prevState.firstSelect[0]][prevState.firstSelect[1]] = null;
                this.state.socket.emit("move", JSON.stringify({
                    user: tempState.user, 
                    room: tempState.room, 
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
            user: u,
            room: r,
        });
    }

    generateTiles(colNum){
        return this.state.boardState[colNum].map((col, index) => {
            return <Tile key={index} onSelect={this.onSelect} piece={col} row={index} col={colNum} image={(index + colNum) % 2 === 0 ? "dark_tile.jpg" : "light_tile.jpg"}/>
        });
    }

    generateRows(){
        return this.state.boardState.map((row, index) => {
            return <li key={[row, index]} style={{paddingLeft: "100px", marginBottom: "-6px"}}>{this.generateTiles(index)}</li>
        });
    }

    render() {
        return(
            <div className="container">
                <div className="col-sm" style={{right: "0%", left: "-30%"}}>
                    <div>
                    {this.state.error != null ? <Error error_msg={this.state.error}/> : null}
                    {this.state.showWaitingMessage ? <PopUp/> : null}
                    <ul style={{listStyle:"none"}}>{this.generateRows()}</ul>
                    </div>
                </div>
               
                <PlayerInfoCard socket={this.state.socket} setUserRoom={this.setUserRoom}/>
            
            </div>
        )
    }
}
export default Board