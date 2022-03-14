import React from 'react'

class Turn extends React.Component {
    render() {
        return (
            <div style={{paddingTop: "10%"}}>
            <div className="card text-white mb-3" style={{backgroundColor: '#043c68', width: '30rem'}}>
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