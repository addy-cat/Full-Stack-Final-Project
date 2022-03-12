import React from 'react'
import Tile from './Tile.js'
import {Piece} from './Piece.js'
import {p} from './Piece.js';
import PlayerInfoCard  from './PlayerInfoCard.js';

class Board extends React.Component {

    constructor(props){
        super(props);
        let myColor = "white";
        let theirColor = "black";
        this.state = {
            myColor: myColor,
            theirColor: theirColor,
            firstSelect: null,
            boardState: [
                [new Piece(p.rook, theirColor), new Piece(p.knight, theirColor), new Piece(p.bishop, theirColor), new Piece(p.king, theirColor), new Piece(p.queen, theirColor), new Piece(p.bishop, theirColor), new Piece(p.knight, theirColor), new Piece(p.rook, theirColor)],
                [new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor), new Piece(p.pawn, theirColor)],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor), new Piece(p.pawn, myColor)],
                [new Piece(p.rook, myColor), new Piece(p.knight, myColor), new Piece(p.bishop, myColor), new Piece(p.king, myColor), new Piece(p.queen, myColor), new Piece(p.bishop, myColor), new Piece(p.knight, myColor), new Piece(p.rook, myColor)],
            ]
        };
        this.onSelect = this.onSelect.bind(this);
        this.generateRows = this.generateRows.bind(this);
        this.generateTiles = this.generateTiles.bind(this);
    }
    
    onSelect(i, j){
        if(this.state.firstSelect == null){
            this.setState((prevState) => {
                let tempState = prevState;
                tempState.firstSelect = [i, j];

                return tempState;
            })
        }
        else {
            this.setState((prevState) => {
                let tempState = prevState;
                tempState.boardState[i][j] = 
                    tempState.boardState[prevState.firstSelect[0]][prevState.firstSelect[1]];
                tempState.boardState[prevState.firstSelect[0]][prevState.firstSelect[1]] = null;
                tempState.firstSelect = null;
                    
                return tempState;
            })
        }
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
                
            < PlayerInfoCard />
            
            </div>
        )
    }
}
export default Board