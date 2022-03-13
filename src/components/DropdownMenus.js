import React from 'react';
const axios = require('axios').default;
class DropdownMenus extends React.Component {

    constructor(props){
        super(props);
        this.loadImage = this.loadImage.bind(this);
    }

    async loadImage() {
        try {
            let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:1, size:"full" } } )
            this.props.setImage(response.data[0].url)
        } catch(err) {
            console.log(err)
        }
    }


    render() {
        return (
            <div className="card " style={{width: '30rem'}}>
                <div className="card-body">
                <div className="d-flex justify-content-center" >
                    <div className="row-sm">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Themes
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                    </div>

                    <div className="row-sm">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Music
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                    </div>

                    <div className="row-sm">
                        <div className="button">
                            <button onClick={this.loadImage} className="btn btn-primary" type="button" id="Button">
                                Change player icon
                            </button>
                            
                        </div>
                    </div>
                    </div>
                </div>            
            </div>
        )
    }
}

export default DropdownMenus;
