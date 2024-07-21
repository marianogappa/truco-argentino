import React from 'react';

const SpeechBubble = ({ playerID, lastActionLog }) => {
    const empty = (
            <div className="speech-bubble-container column">
            </div>
    )
    if (!lastActionLog) {
        return empty;
    }
    const { action, playerID: actionPlayerID } = lastActionLog;
    // This is confusing, but the current playerID is not the one that played the action
    if (playerID === actionPlayerID) {
        return empty;
    }
    if (action.name === 'reveal_card' && !action.en_mesa) {
        return empty;
    }
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
        case 'say_envido_quiero':
            text = `Quiero`;
            break;
        case 'say_envido_score':
            text = `${action.score}`;
            break;
        case 'say_truco_quiero':
            text = 'Quiero';
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
            text = 'Son buenas';
            break;
        case 'say_son_mejores':
            console.log(action);
            text = `${action.score} son mejores`;
            break;
        case 'say_me_voy_al_mazo':
            text = 'Me voy al mazo';
            break;
        case 'reveal_card':
        case 'reveal_envido_score':
            text = `${action.score} en mesa`;
            break;
        default:
            break;
    }

  return (
    <div className="speech-bubble-container column">
        <div className="speech-bubble">
        <div className="speech-bubble-text">{text}</div>
        <div className="speech-bubble-arrow"></div>
        </div>
    </div>
  );
};

export default SpeechBubble;