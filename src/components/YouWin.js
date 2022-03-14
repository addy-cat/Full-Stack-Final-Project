import React from 'react'

class YouWin extends React.Component {
    render() {
        return (
            <div style={{fontSize: "50%", position: "absolute", top: "35%", left: "13%", zIndex: "5", padding:"5% 7%"}} className="alert alert-success" role="alert">
                <h4 style={{fontSize: "3rem"}} className="alert-heading">You Win!</h4>
            </div>
            
        )
    }
}

export default YouWin