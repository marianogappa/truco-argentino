export default function ActionButtons({isHumanTurn, actions, handleAction, isGameEnded}) {
    if (!isHumanTurn || isGameEnded) {
        return (
            <div className="actionButtons"></div>
        );
    }
    return (
        <div className="actionButtons">
        {actions.filter(action => action.name != 'reveal_card' && action.name != 'confirm_round_finished').map((action) => (
            <ActionButton action={action} handleAction={handleAction}  />
        ))}
        </div>
    );
}
  
export function ActionButton({action, handleAction}) {
    if (!action) {
        return null;
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
        case 'reveal_envido_score':
            text = `${action.score} en mesa`;
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
            text = `${action.score} son mejores`;
            break;
        case 'say_me_voy_al_mazo':
            text = 'Me voy al mazo';
            break;
        case 'say_me_voy_al_mazo':
            text = 'Me voy al mazo';
            break;
        case 'confirm_round_finished':
            text = 'Siguiente mano';
            break;
        case 'leave_game':
            text = '¿Otro?';
        case 'say_flor':
            text = 'Flor';
            break;
        case 'say_contraflor':
            text = 'Contraflor';
            break;
        case 'say_contraflor_al_resto':
            text = 'Contraflor al resto';
            break;
        case 'say_con_flor_quiero':
            text = 'Con flor quiero';
            break;
        case 'say_con_flor_me_achico':
            text = 'Con flor me achico';
            break;
        case 'say_flor_son_buenas':
            text = 'Son buenas';
            break;
        case 'say_flor_son_mejores':
            text = `${action.score} son mejores`;
            break;
        case 'say_flor_score':
            text = `${action.score}`;
            break;
        case 'reveal_flor_score':
            text = `${action.score} en mesa`;
            break;
        default:
            break;
    }

    if (action.name == 'say_truco_quiero' && action.requires_reminder) {
        window.setTimeout(() => {
            Array.from(document.getElementsByClassName('speech-bubble-text')).forEach((e) => e.textContent = 'Dije truco...');
        }, 1000);
    }


    return (
        <button onClick={() => handleAction(action)}>{text}</button>
    );
}