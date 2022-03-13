import React from 'react'

class Error extends React.Component {
    render() {
        return (
            <div style={{position: "absolute", top: "40%", left: "20%", zIndex: "5"}} className="alert alert-danger" role="alert">
                <h4 className="alert-heading">{this.props.error_msg}</h4>
            </div>
        )
    }
}

export default Error