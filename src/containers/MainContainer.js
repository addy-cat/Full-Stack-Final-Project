import React from 'react'
import PlayerInfoCard from '../components/PlayerInfoCard';
import BasicGameBoard from '../components/BasicGameBoard'

function MainContainer() {
    return (
        <div>
            <BasicGameBoard />
            <PlayerInfoCard />
        </div>
        
    );
}

export default MainContainer;