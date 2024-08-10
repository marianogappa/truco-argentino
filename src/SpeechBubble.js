import React from 'react';
import { useEffect, useState } from 'react';
import { regularActionTexts } from './regularActionTexts';
import { specialActionTexts } from './specialActionTexts';
import { secretMode } from './secretMode';

const actionTexts = secretMode ? specialActionTexts : regularActionTexts;

const fallbackText = (action) => {
    let text = '';
    switch (action.name) {
        case 'say_envido':
            text = 'Envido';
            break;
        case 'say_real_envido':
            text = 'Real envido';
            break;
        case 'say_falta_envido':
            text = 'Falta envido';
            break;
        case 'say_truco':
            text = 'Truco';
            break;
        case 'say_envido_score':
        case 'say_flor_score':
            text = `${action.score}`;
            break;
        case 'say_envido_quiero':
        case 'say_truco_quiero':
            if (action.forced) {
                text = 'Quiero obligado';
            } else {
                text = 'Quiero';
            }
            break;
        case 'say_quiero_retruco':
            text = 'Quiero retruco';
            break;
        case 'say_quiero_vale_cuatro':
            text = 'Quiero vale cuatro';
            break;
        case 'say_envido_no_quiero':
        case 'say_truco_no_quiero':
            text = 'No quiero';
            break;
        case 'say_son_buenas':
        case 'say_flor_son_buenas':
            text = 'Son buenas';
            break;
        case 'say_son_mejores':
        case 'say_flor_son_mejores':
            text = `${action.score} son mejores`;
            break;
        case 'say_me_voy_al_mazo':
            text = 'Me voy al mazo';
            break;
        case 'reveal_card':
        case 'reveal_envido_score':
        case 'reveal_flor_score':
            text = `${action.score} en mesa`;
            break;
        case 'say_flor':
            text = 'Flor';
            break;
        case 'say_contraflor_al_resto':
            text = 'Contraflor al resto';
            break;
        case 'say_contraflor':
            text = 'Contraflor';
            break;
        case 'say_con_flor_quiero':
            text = 'Con flor quiero';
            break;
        case 'say_con_flor_me_achico':
            text = 'Con flor me achico';
            break;
        default:
            break;
    }
    return [text];
}

const getLines = (action) => {
    if (action === null) {
        return [];
    }
    if (actionTexts[action.name]) {
        const options = actionTexts[action.name];
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    }
    return fallbackText(action);
}

const getSpeechBubbleClass = (lines) => {
    switch (lines.length) {
        case 1:
            return "speech-bubble small-speech-bubble";
        case 2, 3, 4:
            return "speech-bubble medium-speech-bubble"
        case 0:
            return "speech-bubble hidden";
        default:
            return "speech-bubble";
    }
}

const getAction = (playerID, lastActionLog) => {
    if (!lastActionLog) {
        return null;
    }
    const { playerID: actionPlayerID, action } = lastActionLog;
    if (playerID === actionPlayerID) {
        return null;
    }
    if (action.name === 'reveal_card' && !action.en_mesa) {
        return null;
    }
    if (action.name === 'say_me_voy_al_mazo') {
        return null;
    }
    return action;
}

const SpeechBubble = ({ playerID, lastActionLog, dijeTruco }) => {
    const [showDijeTruco, setShowDijeTruco] = useState(false);

    useEffect(() => {
        if (!dijeTruco) {
            setShowDijeTruco(false);
            return;
        }
        const timer = setTimeout(() => {
            setShowDijeTruco(true);
        }, 2000);

        return () => clearTimeout(timer); // Cleanup the timeout on component unmount
    }, [dijeTruco]); // Add dijeTruco as a dependency

    const action = getAction(playerID, lastActionLog);
    let lines = getLines(action);
    let speechBubbleClass = getSpeechBubbleClass(lines);

    if (showDijeTruco) {
        lines = ['Dije truco...'];
        speechBubbleClass = "speech-bubble small-speech-bubble";
    }

    return (
        <div className="speech-bubble-container column">
            <div className={speechBubbleClass}>
                <div className="speech-bubble-text">
                    {lines.map((line, index) => (
                        <p key={index}>{line}</p> // Ensure key is unique and consistent
                    ))}
                </div>
                <div className="speech-bubble-arrow"></div>
            </div>
        </div>
    );
};


export default SpeechBubble;