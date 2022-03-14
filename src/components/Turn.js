import React from 'react'

class Turn extends React.Component {
    render() {
        return (
            <div className="col-sm" style={{left: "500px", bottom: "700px"}}>
            <div className="card text-white bg-info mb-3" style={{width: '30rem'}}>
                <div className="card-body">
                    <div className="d-flex justify-content-center" >
                        <h5 style={{fontSize: '35px'}} className="d-flex justify-content-center card-title"> {this.props.turn}</h5>
                    </div>
                </div>
                </div>
        </div>
            
        )
    }
}

export default Turn