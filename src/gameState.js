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
            }
        } else {
            this.runBotAction();
        }

        this.playSound();

        // If the game is not ended and it's the bot's turn, we run the bot action after a delay
        if (!this.gameState.isGameEnded && this.gameState.turnPlayerID !== 0) {
            window.setTimeout(() => callback(this.runAction({}, callback)), 2000);
        }

        return this.gameState;
    }

    runBotAction() {
        this.gameState = jsBotRunAction();
    }

    playSound() {
        if (this.gameState.lastActionLog) {
            if (this.gameState.lastActionLog.action.name === "reveal_card") {
                playAudio('reveal_card');
                return;
            }
            
            // The computer just played the action, so the turn already changed
            if (this.gameState.turnPlayerID === 0) {
                switch (this.gameState.lastActionLog.action.name) {
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
            } else {
                playAudio('press');
            }
        }

    }
}

