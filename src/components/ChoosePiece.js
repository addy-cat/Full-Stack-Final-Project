import React from 'react';

class ChoosePiece extends React.Component {
    render() {
        return (
           // <div className="card " style={{height: '10rem', width: '30rem'}}>
            <div className="card-body">
            <div className="d-flex justify-content-center" >
            <div style={{height: '10rem', width: '30rem', left: "420px", bottom: "700px"}} className="alert alert-success" role="alert">
                <h4 style={{display: "inline"}} className="alert-heading">Choose Piece:</h4>
               
                    <div className="dropdown">
                        <button style={{display: "inline"}} className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Piece
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <b className="dropdown-item" onClick={() => this.props.getPiece(4)}>Queen</b>
                            <b className="dropdown-item" onClick={() => this.props.getPiece(1)}>Knight</b>
                            <b className="dropdown-item" onClick={() => this.props.getPiece(2)}>Bishop</b>
                            <b className="dropdown-item" onClick={() => this.props.getPiece(3)}>Rook</b>
                        </div>
                    </div>
                </div>
            </div>   
            </div>
            
          //  </div>
        )
    }
}
export default ChoosePiece