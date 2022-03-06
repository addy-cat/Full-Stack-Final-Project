import React from 'react'

class Tile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            color: props.color
        };
        this.onSelect = this.onSelect.bind(this);
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
    }

    render() {
        return <div onClick={this.onSelect} style={{padding: "5%", display: "inline-block", backgroundColor: this.state.color}}>
           <p style={{position: "absolute"}}>{this.props.piece !== null ? this.props.piece.piece : ""}</p>
        </div>
    }
}

export default Tile;