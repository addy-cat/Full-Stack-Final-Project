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
            theirImage: null,
            theme: null
        }

        this.props.socket.on('cat', (data) => {
            let message = JSON.parse(data);
            this.setState({
                theirImage: message.image
            });
        });
        this.onSubmit = this.onSubmit.bind(this);
        this.setImage = this.setImage.bind(this);
        this.setTheme = this.setTheme.bind(this);
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

    setTheme(theme) {
        this.props.setTheme(theme);
    }

    render() {
        return (
            <div>
                <DropdownMenus setImage={this.setImage} setTheme={this.setTheme}/>
                <div className="card " style={{width: '30rem', backgroundColor:'#4b84c0'}}>
                    <div className= "card-body row-sm">
                        <h5 style={{fontSize: '25px'}} className="d-flex justify-content-center card-title">Player Information</h5>
                        <form>   
                            <button style={{width: '9rem', backgroundColor: "#223f5e" }} type="button" className="btn btn-primary mx-auto d-block mt-4" onClick={this.onSubmit}>Start Game!</button>
                            <div className="d-inline-flex mt-5">
                                <label style={{width: '13rem'}} htmlFor="inputUsername" className="form-label">Your username: </label>
                                <input placeholder="Pick a username" type="username" className="form-control ml-2" name="inputUsername" onChange={event => this.setState({user: event.target.value})} value={this.state.user}/>
                            </div>
                        </form> 

                        <form>   
                            <div className="row-sm d-inline-flex mt-2">
                                <label style={{width: '13rem'}} htmlFor="inputRoomID" className="form-label">Your room ID: </label>
                                <input placeholder="Pick a room ID" type="id" className="form-control ml-2 mb-3" name="inputRoomID" onChange={event => this.setState({room: event.target.value})} value={this.state.room}/>
                            </div>
                        </form>  
                        <div className="row" >
                            <div className="col-sm" style={{left:"3rem"}}>
                            <figure>
                                <img src={this.state.image != null ? this.state.image : "default_cat2.jpg"} alt="Cat 2" style={{ width: '7rem', height: '6rem'}} className="img-thumbnail"></img>
                                <figcaption>Player 2</figcaption>
                            </figure>
                            </div>
                            <div className="col-sm" style={{left:"2.5rem", paddingTop:"1.5rem"}}>
                                <h5 style={{fontSize: '2.5rem'}}>VS</h5>
                            </div>
                            <div className="col-sm" style={{right:"2.2rem"}}>
                                <figure>
                                <img src={this.state.theirImage != null ? this.state.theirImage : "default_cat.jpg"} alt="Cat 1" style={{ width: '7rem', height: '6rem'}} className="img-thumbnail"></img>
                                <figcaption>Player 1</figcaption>
                                </figure>
                            </div>
                        </div>

                    </div> 
                </div>
            </div>
            
          
        )
    }      
}

export default PlayerInfoCard;