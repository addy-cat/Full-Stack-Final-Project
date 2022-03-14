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

    getRandomInt() {
        return Math.floor(Math.random() * (19 - 0) + 0); 
    }

    async loadTheme() {
        try {
            let response = await axios.get('https://pixabay.com/api/?key=26133044-1e586225ee12bcdccc3a2c911&q=trees+nature&min_height=1000')//, config);
            //console.log(response.data.hits[this.getRandomInt()].largeImageURL)
            this.props.setTheme(response.data.hits[this.getRandomInt()].largeImageURL)
        } catch(err) {
            console.log(err)
        }
    }


    render() {
        return (
            <div className="card " style={{width: '30rem', backgroundColor:'#4b84c0'}}>
                <div className="card-body">
                    <div className="d-flex justify-content-center" >
                        <div className="button">
                            <button style={{backgroundColor: "#223f5e" }} onClick={this.loadTheme} className="btn btn-primary" type="button" id="Button">
                                Change background theme
                            </button>
                        </div>
                    
                        <div className="button" style={{paddingLeft: "4%"}}>
                            <button style={{backgroundColor: "#223f5e" }} onClick={this.loadImage} className="btn btn-primary" type="button" id="Button">
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
