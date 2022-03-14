import React from 'react'

var player1_dict = {
    0: "pawn_new.png",
    1: "knight_new.png",
    2: "bishop_new.png",
    3: "rook_new.png",
    4: "queen_new.png",
    5: "king_new.png"
}

var player2_dict = {
    0: "pawn_new2.png",
    1: "knight_new2.png",
    2: "bishop_new2.png",
    3: "rook_new2.png",
    4: "queen_new2.png",
    5: "king_new2.png"
}
class Tile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            color: null,
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
        if (true){
            this.setState({
                color: "rgba(200,100,0,.5)"
            });
        } else {
            this.setState({
                color: "rgba(200,100,0,.5)"
            });
        }
        this.props.onSelect(this.props.col, this.props.row)
    }

    render() {
        return <div onClick={this.onSelect} style={{padding: "5%", display: "inline-block", backgroundColor: this.state.color ? this.state.color : "", backgroundImage: `${this.props.piece == null ? "" : `url(${this.choosePiece(this.props.piece)}), `}url(${this.props.image})`, backgroundSize: "100%"}}></div>
    }
}

export default Tile;