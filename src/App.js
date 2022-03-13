import React from 'react';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import './App.css';
import MainContainer from './containers/MainContainer.js'
import Nav from './containers/Nav.js'

function App() {
  return (
    <ThemeProvider prefixes={{bth: 'my-btn'}}>
      <div className="App">
        <MainContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;