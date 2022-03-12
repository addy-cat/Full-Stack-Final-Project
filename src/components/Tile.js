import React from 'react'

var player1_dict = {
    0: "pawn.png",
    1: "knight.png",
    2: "bishop.png",
    3: "rook.png",
    4: "queen.png",
    5: "king.png"
}

var player2_dict = {
    0: "pawn2.png",
    1: "knight2.png",
    2: "bishop2.png",
    3: "rook2.png",
    4: "queen2.png",
    5: "king2.png"
}
class Tile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            color: props.color,
            piece: props.piece
        };
        this.onSelect = this.onSelect.bind(this);
        this.choosePiece = this.choosePiece.bind(this);
    }

    choosePiece(piece) {
        if(!piece){
            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
        }

        if(piece.color === "black") {
            return '/pieces/' + player1_dict[piece.piece] 
        } else {
            return '/pieces/' + player2_dict[piece.piece]
        }
    }

    onSelect(){
        if (this.props.color === "black"){
            this.setState({
                color: "#333336"
            });
        } else {
            this.setState({
                color: "#C1C1CB"
            });
        }
        this.props.onSelect(this.props.col, this.props.row)
    }

    render() {
        return <div onClick={this.onSelect} style={{padding: "5%", display: "inline-block", backgroundColor: this.state.color}}>
           <img style={{position: "absolute", paddingBottom: "30px", height: "10%"}} src={this.choosePiece(this.state.piece)} alt="Chess Piece"></img>
        </div>
    }
}

export default Tile;