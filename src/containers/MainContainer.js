import React from 'react'
import Board from '../components/Board';

function MainContainer(props) {

    return (
        <div>
            <Board setTheme={props.setTheme}/>
        </div>
        
    );
}

export default MainContainer;