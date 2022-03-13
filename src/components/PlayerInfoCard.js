import React from 'react'
import DropdownMenus from './DropdownMenus';
import { io } from 'socket.io-client';

class PlayerInfoCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: null,
            room: null,
            socket: this.props.socket
        }

        this.state.socket.on("message", (data) => {
            console.log(data);
        })

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(){
        this.state.socket.emit("message", JSON.stringify({
            username: this.state.username, 
            room: this.state.room,
            requestType: "joinRoom"
        }));
        this.props.setUserRoom(this.state.username, this.state.room);
    }

    render() {
        return (
            <div className="col-sm" style={{left: "500px", bottom: "600px"}}>
            <DropdownMenus />
            <div className="card " style={{width: '30rem'}}>
                  <div className= "card-body">
                    <h5 style={{fontSize: '25px'}} className="d-flex justify-content-center card-title">Player Information</h5>
                    <form>   
                        <button style={{width: '9rem'}} type="button" className=" btn btn-primary mx-auto d-block mt-4" onClick={this.onSubmit}>Start Game!</button>
                        <div className="d-inline-flex mt-5">
                            <label style={{width: '13rem'}} for="inputUsername" className="form-label">Your username: </label>
                            <input placeholder="Pick a username" type="username" className="form-control ml-2" name="inputUsername" onChange={event => this.setState({username: event.target.value})} value={this.state.username}/>
                        </div>
                    </form> 

                     <form>   
                        <div className="d-inline-flex mt-2">
                            <label style={{width: '13rem'}} for="inputRoomID" className="form-label">Your room ID: </label>
                            <input placeholder="Pick a room ID" type="id" className="form-control ml-2 mb-3" name="inputRoomID" onChange={event => this.setState({room: event.target.value})} value={this.state.room}/>
                        </div>
                    </form>  
                    <div className="d-flex justify-content-center" >
                        <img src="..." alt="" style={{ width: '5rem', height: '5rem'}} className="img-thumbnail mr-5 ml-5"></img>
                        <div >
                            <input style={{fontSize:'2.5rem'}} type="text" readonly className="col ml-2 mr-2 form-control-plaintext" id="staticVs" value="vs" />
                        </div>
                        <img src="..." alt="" style={{ width: '5rem', height: '5rem'}} className="img-thumbnail mr-5"></img>
                    </div>
              </div> 
              </div>
              </div>
            
          
        )
    }      
}

export default PlayerInfoCard;