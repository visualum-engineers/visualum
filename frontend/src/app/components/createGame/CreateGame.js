import React, { useState } from 'react';
import NewGameForm from './NewGameForm';
import GameSettings from './GameSettings'

export default function CreateGame() {
    const [stage, setStage] = useState(1);

    const [gameName, setGameName] = useState("");
    const [isCompetitive, setIsCompetitive] = useState(false);

    const handleChange = evt => {
        setGameName(evt.target.value)
    }
    const handleStageChange = newStage => {
        setStage(newStage);
    }
    const handleToggleCompetitive = evt => {
        setIsCompetitive(evt.target.value);
    }
    // const handleSubmit = () => {
    //     // Logic to send info to backend in a JSON obj.
    // }
    console.log(isCompetitive)
    let page;
    switch (stage) {
        case 1:
            page = <NewGameForm gameName={gameName} handleChange={handleChange} handleStageChange={handleStageChange} />;
            break;
        case 2:
            page = <GameSettings handleToggleCompetitive={handleToggleCompetitive} handleStageChange={handleStageChange} />;
            break;
        default:
            page = "pee";
    }
    return (
        <div className="form-page">
            <div className="form-container">
                {page}
                
            </div>
        </div>
    )
}