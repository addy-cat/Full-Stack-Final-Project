import React, { useState,useEffect } from 'react';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import './App.css';
import MainContainer from './containers/MainContainer.js'
import Nav from './containers/Nav.js'
import io from 'socket.io-client'

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(()=>{
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <ThemeProvider prefixes={{bth: 'my-btn'}}>
      <div className="App">
        <MainContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;