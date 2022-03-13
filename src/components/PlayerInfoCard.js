import React from 'react'
import DropdownMenus from './DropdownMenus';
class PlayerInfoCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: "",
            room: "",
            socket: this.props.socket,
            image: null, 
            theirImage: null
        }

        this.props.socket.on('cat', (data) => {
            let message = JSON.parse(data);
            this.setState({
                theirImage: message.image
            });
        });
        this.onSubmit = this.onSubmit.bind(this);
        this.setImage = this.setImage.bind(this);
    }

    onSubmit(){
        this.state.socket.emit("joinRoom", JSON.stringify({
            user: this.state.user, 
            room: this.state.room, 
            image: this.state.image
        }));
        this.props.setUserRoom(this.state.user, this.state.room);
    }

    setImage(image){
        this.setState({
            image: image
        });
        this.state.socket.emit('cat', JSON.stringify({user: this.state.user, room: this.state.room, image: image}));
    }

    render() {
        return (
            <div className="col-sm" style={{left: "500px", bottom: "700px"}}>
                <DropdownMenus setImage={this.setImage}/>
                <div className="card " style={{width: '30rem'}}>
                    <div className= "card-body">
                        <h5 style={{fontSize: '25px'}} className="d-flex justify-content-center card-title">Player Information</h5>
                        <form>   
                            <button style={{width: '9rem'}} type="button" className=" btn btn-primary mx-auto d-block mt-4" onClick={this.onSubmit}>Start Game!</button>
                            <div className="d-inline-flex mt-5">
                                <label style={{width: '13rem'}} htmlFor="inputUsername" className="form-label">Your username: </label>
                                <input placeholder="Pick a username" type="username" className="form-control ml-2" name="inputUsername" onChange={event => this.setState({user: event.target.value})} value={this.state.user}/>
                            </div>
                        </form> 

                        <form>   
                            <div className="d-inline-flex mt-2">
                                <label style={{width: '13rem'}} htmlFor="inputRoomID" className="form-label">Your room ID: </label>
                                <input placeholder="Pick a room ID" type="id" className="form-control ml-2 mb-3" name="inputRoomID" onChange={event => this.setState({room: event.target.value})} value={this.state.room}/>
                            </div>
                        </form>  
                        <div className="d-flex justify-content-center" >
                            <img src={this.state.image != null ? this.state.image : "default_cat2.jpg"} alt="" style={{ width: '6rem', height: '6rem'}} className="img-thumbnail mr-5 ml-5"></img>
                            <div>
                                <input style={{fontSize:'2.5rem'}} type="text" readOnly className="col ml-2 mr-2 form-control-plaintext" id="staticVs" value="vs" />
                            </div>
                            <img src={this.state.theirImage != null ? this.state.theirImage : "default_cat.jpg"} alt="" style={{ width: '6rem', height: '6rem'}} className="img-thumbnail mr-5"></img>
                        </div>
                    </div> 
                </div>
            </div>
            
          
        )
    }      
}

export default PlayerInfoCard;