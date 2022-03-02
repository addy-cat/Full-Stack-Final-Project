import React from 'react'

class PlayerInfoCard extends React.Component {
    render() {
        return (
                
            <div class="container">
            <div class="column">
            <div class="row-md">
            <div class="card " style={{width: '30rem'}}>
                  <div class= "card-body">
                    <h5 style={{fontSize: '25px'}} class="d-flex justify-content-center card-title">Player Information</h5>
                    <button style={{width: '9rem'}} type="button" class=" btn btn-primary mx-auto d-block mt-4">Start Game!</button>
                    <form>   
                        <div class="d-inline-flex mt-5">
                            <label style={{width: '13rem'}} for="inputUsername" class="form-label">Your username: </label>
                            <input placeholder="Pick a username" type="username" class="form-control ml-2" name="inputUsername"/>
                        </div>
                    </form> 

                     <form>   
                        <div class="d-inline-flex mt-2">
                            <label style={{width: '13rem'}} for="inputRoomID" class="form-label">Your room ID: </label>
                            <input placeholder="Pick a room ID" type="id" class="form-control ml-2 mb-3" name="inputRoomID"/>
                        </div>
                    </form>  
                    <div class="d-flex justify-content-center" >
                        <img src="..." style={{ width: '5rem', height: '5rem'}} class="img-thumbnail mr-5 ml-5"></img>
                        <div >
                            <input style={{fontSize:'2.5rem'}} type="text" readonly class="col ml-2 mr-2 form-control-plaintext" id="staticVs" value="vs" />
                        </div>
                        <img src="..." style={{ width: '5rem', height: '5rem'}} class="img-thumbnail mr-5"></img>
                    </div>
              </div> 
              </div>
              </div>
            </div>
            </div>
        )
    }
      
        
}

export default PlayerInfoCard;