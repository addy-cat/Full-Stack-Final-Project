import React from 'react'
import Tile from './Tile.js'
class BasicGameBoard extends React.Component {

    generateTiles(rowNum, colNum){
        let tiles = []
        for(let i = 0; i < rowNum; i++){
            tiles.push(<Tile color={(i+colNum) % 2 === 0 ? "black" : "white"}/>);
        }

        return tiles;
    }
    generateRows(num){
        let rows = []
            for (let i = 0; i < num; i = i + 1){
                rows.push(<li>{this.generateTiles(num, i)}</li>);
            }

        return rows;
    }

    render() {
        return <div>
            <ul style={{listStyle:"none"}}>{this.generateRows(8)}</ul>
        </div>
    }
}

export default BasicGameBoard