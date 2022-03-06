import React from 'react'
import Tile from './Tile.js'
import {Piece} from './Piece.js'
import {p} from './Piece.js';
import PlayerInfoCard  from './PlayerInfoCard.js';

class Board extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            myColor: "white",
            theirColor: "black",
            boardState: [
                [new Piece(p.rook, this.theirColor), new Piece(p.knight, this.theirColor), new Piece(p.bishop, this.theirColor), new Piece(p.king, this.theirColor), new Piece(p.queen, this.theirColor), new Piece(p.bishop, this.theirColor), new Piece(p.knight, this.theirColor), new Piece(p.rook, this.theirColor)],
                [new Piece(p.pawn, this.theirColor), new Piece(p.pawn, this.theirColor), new Piece(p.pawn, this.theirColor), new Piece(p.pawn, this.theirColor), new Piece(p.pawn, this.theirColor), new Piece(p.pawn, this.theirColor), new Piece(p.pawn, this.theirColor), new Piece(p.pawn, this.theirColor)],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null],
                [new Piece(p.pawn, this.myColor), new Piece(p.pawn, this.myColor), new Piece(p.pawn, this.myColor), new Piece(p.pawn, this.myColor), new Piece(p.pawn, this.myColor), new Piece(p.pawn, this.myColor), new Piece(p.pawn, this.myColor), new Piece(p.pawn, this.myColor)],
                [new Piece(p.rook, this.myColor), new Piece(p.knight, this.myColor), new Piece(p.bishop, this.myColor), new Piece(p.king, this.myColor), new Piece(p.queen, this.myColor), new Piece(p.bishop, this.myColor), new Piece(p.knight, this.myColor), new Piece(p.rook, this.myColor)],
            ]
        };
    }

    generateTiles(rowNum, colNum, piece){
        let tiles = []
        for(let i = 0; i < rowNum; i++){
            tiles.push(<Tile piece={this.state.boardState[colNum][i]} color={(i+colNum) % 2 === 0 ? "black" : "white"}/>);
        }

        return tiles;
    }
    generateRows(num){
        let rows = []
            for (let i = 0; i < num; i = i + 1){
                rows.push(<li style={{paddingLeft: "100px"}}>{this.generateTiles(num, i)}</li>);
            }

        return rows;
    }

    render() {
        return(
            <div class="container">
           
                <div class="col-sm" style={{right: "0%", left: "-30%"}}>
                    
                    <div>
                    <ul style={{listStyle:"none"}}>{this.generateRows(8)}</ul>
                    </div>
                </div>
                
            < PlayerInfoCard />
            
            </div>
        )
    }
}
export default Board