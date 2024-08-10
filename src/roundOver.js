import { regularHumanWinTexts, regularBotWinTexts } from './regularWinTexts';
import { specialHumanWinTexts, specialBotWinTexts } from './specialWinTexts';
import { secretMode } from './secretMode';

export function getRoundOverContent(gameState) {
  const text = getRoundOverText(gameState);
  if (!text) {
    return (<></>);
  }
  return (
    <div id="roundOverContent">
      <div className="roundOverContentSide"></div>
      <img src={`${process.env.PUBLIC_URL}/img/bot.png`}/>
      <div className="roundOverContentText">{text}</div>
      <div className="roundOverContentSide"></div>
    </div>
  );
}

function getRoundOverText(gameState) {
    const botWinTexts = secretMode ? specialBotWinTexts : regularBotWinTexts;
    const humanWinTexts = secretMode ? specialHumanWinTexts : regularHumanWinTexts;
  
    if (!(gameState.possibleActions.length === 1 && gameState.possibleActions[0].name === "confirm_round_finished" && !gameState.isGameEnded)) {
      return '';
    } 
  
    if (!gameState.lastActionLog) {
      return '';
    }
  
    if (gameState.lastActionLog.action.name === "say_me_voy_al_mazo" && gameState.lastActionLog.action.playerID === 1) {
      return humanWinTexts[Math.floor(Math.random() * humanWinTexts.length)];
    }
  
    if (gameState.lastActionLog.action.name === "reveal_card") {
      if (gameState.trucoWinnerPlayerID === 1) {
        return botWinTexts[Math.floor(Math.random() * botWinTexts.length)];
      } else if (gameState.trucoWinnerPlayerID === 0) {
        return humanWinTexts[Math.floor(Math.random() * humanWinTexts.length)];
      }
    }
  
    return '';
  }