import React from 'react';
import './App.css';
import MainContainer from './containers/MainContainer.js'
import Nav from './containers/Nav.js'

function App() {
  return (
    <div className="App">
      <Nav />
      <MainContainer />
    </div>
  );
}

export default App;