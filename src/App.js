import React from 'react';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import './App.css';
import MainContainer from './containers/MainContainer.js'
import Nav from './containers/Nav.js'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      theme: null
    };

    this.setTheme = this.setTheme.bind(this);
  }

  setTheme(theme){
    this.setState({
      theme: theme
    });
  }

  render(){
    return <ThemeProvider prefixes={{bth: 'my-btn'}}>
            <div style={{backgroundImage: this.state.theme ? `url(${this.state.theme})` : null, backgroundSize: "100%"}} className="App">
            <MainContainer setTheme={this.setTheme}/>
            </div>
          </ThemeProvider>
  }
};

export default App;