import React from 'react'

class PopUp extends React.Component {
    render() {
        return (
            <div style={{position: "absolute", top: "40%", left: "20%", zIndex: "5"}} className="alert alert-success" role="alert">
                <h4 className="alert-heading">Waiting for another player to join the room...</h4>
            </div>
        )
    }
}

export default PopUp