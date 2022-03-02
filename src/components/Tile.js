import React from 'react'

class Tile extends React.Component {
    render() {
        return <div style={{padding: "2.8%", display: "inline-block", backgroundColor: this.props.color}}>
        </div>
    }
}

export default Tile;