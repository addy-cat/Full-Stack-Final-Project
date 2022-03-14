import React from 'react';
const axios = require('axios').default;
class DropdownMenus extends React.Component {

    constructor(props){
        super(props);
        this.loadImage = this.loadImage.bind(this);
        this.loadTheme = this.loadTheme.bind(this);
    }

    async loadImage() {
        try {
            let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:1, size:"full" } } )
            this.props.setImage(response.data[0].url)
        } catch(err) {
            console.log(err)
        }
    }

    async loadTheme() {
        try {
            let config = {
                headers: {
                    Authorization: '563492ad6f9170000100000100a7abcccba74d05b5291a4c5a43b7a6'
                }
            }
            let response = await axios.get('https://api.pexels.com/v1/search?query=nature&per_page=1&size=medium', config);
            this.props.setTheme(response.data.photos[0].src.original)
        } catch(err) {
            console.log(err)
        }
    }


    render() {
        return (
            <div className="card " style={{width: '30rem'}}>
                <div className="card-body">
                    <div className="d-flex justify-content-center" >
                        <div className="button">
                            <button onClick={this.loadTheme} className="btn btn-primary bg-info" type="button" id="Button">
                                Change background theme
                            </button>
                        </div>
                    
                        <div className="button" style={{paddingLeft: "4%"}}>
                            <button onClick={this.loadImage} className="btn btn-primary bg-info" type="button" id="Button">
                                Change player icon
                            </button> 
                        </div>
                    </div>
                </div>            
            </div>
        )
    }
}

export default DropdownMenus;
