import { playAudio } from './audio';

export class GameStateManager {
    constructor() {
        this.gameState = null;
        this.nextGameState = null;
    }

    start({maxPoints, isFlorEnabled}) {
        this.gameState = jsTrucoNew({maxPoints, isFlorEnabled});
        return this.gameState;
    }

    runAction(action, callback) {
        if (this.gameState.turnPlayerID === 0) {
            if (action && action.name) {
                this.gameState = jsRunAction(action);
                this.playSound();
            }
        } else {
            const changed = this.runBotAction();
            if (!changed) {
                return null;
            }
            this.playSound();
        }

        // If the game is not ended and it's the bot's turn, we run the bot action after a delay
        if (!this.gameState.isGameEnded && this.gameState.turnPlayerID !== 0) {
            // If the bot's last action was "say_flor", let's wait twice the time
            // because it's confusing which such long texts what the bot is doing
            let waitTimeSeconds = 2;
            if (this.gameState.lastActionLog && this.gameState.lastActionLog.action.name === "say_flor" && this.gameState.lastActionLog.playerID === 1) {
                waitTimeSeconds = 4;
            }
            window.setTimeout(() => {
                const result = this.runAction({}, callback);
                if (result) {
                    callback(result);
                }
            }, waitTimeSeconds * 1000);
        }

        return this.gameState;
    }

    runBotAction() {
        const _before = JSON.stringify(this.gameState);
        this.gameState = jsBotRunAction();
        const _after = JSON.stringify(this.gameState);
        return _before !== _after;
    }

    playSound() {
        if (!this.gameState.lastActionLog) {
            return;
        }

        const action = this.gameState.lastActionLog.action;

        if (action.name === "reveal_card") {
            playAudio('reveal_card');
            return;
        }
        
        // The computer just played the action, so the turn already changed
        if (action.playerID === 0) {
            playAudio('press');
            return;
        }

        switch (action.name) {
            case "say_envido":
            case "say_real_envido":
            case "say_falta_envido":
            case "say_truco":
                playAudio('envido');
                break;
            case "say_envido_quiero":
            case "say_truco_quiero":
            case "say_quiero_retruco":
            case "say_quiero_vale_cuatro":
                playAudio('yes');
                break;
            case "say_envido_no_quiero":
            case "say_truco_no_quiero":
                playAudio('no');
                break;
            case "say_son_buenas":
                playAudio('son_buenas');
                break;
            case "say_son_mejores":
                playAudio('son_mejores');
                break;
            default:
                break;
        }
    }
}

