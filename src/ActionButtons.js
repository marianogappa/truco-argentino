export default function ActionButtons({isHumanTurn, actions, handleAction}) {
    if (!isHumanTurn) {
        return (
            <div className="actionButtons"></div>
        );
    }
    return (
        <div className="actionButtons">
        {actions.filter(action => action.name != 'reveal_card').map((action) => (
            <ActionButton action={action} handleAction={handleAction}  />
        ))}
        </div>
    );
}
  
function ActionButton({action, handleAction}) {
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
            text = `Quiero con ${action.score}`;
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
        default:
            break;
    }


    return (
        <button onClick={() => handleAction(action)}>{text}</button>
    );
}