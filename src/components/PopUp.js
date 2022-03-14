import React from 'react'

class PopUp extends React.Component {
    render() {
        return (
            <div style={{position: "absolute", top: "40%", left: "45%", zIndex: "5", width: "100%", padding: "4% 4%"}} className="alert alert-success" role="alert">
                <h4 className="alert-heading">Waiting for another player to join the room...</h4>
            </div>
            
        )
    }
}

export default PopUp