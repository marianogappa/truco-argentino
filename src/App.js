import { useState } from 'react';
import Card from './Card';
import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { GameStateManager } from './gameState';
import { playAudio } from './audio';
import SpeechBubble from './SpeechBubble';
import ActionButtons from './ActionButtons';
import PlayerSection from './PlayerSection';

function Hand({ isBackwards, cards, actions, handleAction }) {
  cards = cards || [];
  return (
    <div className="hand">
      {cards.map((card, _) => (
        <Card isBackwards={isBackwards} card={card} actions={actions} handleAction={handleAction} />
      ))}
    </div>
  )
}

function calculateLastActionSummary({gameState}) {
  if (!gameState.lastActionLog) {
    if (gameState.roundNumber === 1) {
        return "¡Empezó el juego!";
    }
    return "¡Empezó la mano!";
  }

  return '';
}

function Summary({gameState}) {
  return (
    <div className="summary">{calculateLastActionSummary({gameState})}</div>        
  )
}

function Game({manager}) {
  const [trigger, setTrigger] = useState(0);

  function handleAction(action) {
    setTrigger(manager.runAction(action, setTrigger))
  }

  const gameState = manager.gameState;

  const isHumanTurn = gameState.turnPlayerID === 0;
  const isBotTurn = gameState.turnPlayerID === 1;

  return (
    <div className="gameContainer">
      <div className="row">
        <div className="theirUnrevealedCards column">
          <Hand isBackwards={true} cards={Array(gameState.theirUnrevealedCardLength).fill({})} />
        </div>
        <SpeechBubble playerID={0} lastActionLog={gameState.lastActionLog} className="column" />
        <PlayerSection name="Bot" points={gameState.theirScore} imgSrc={"/img/bot.png"} isTheirTurn={isBotTurn} />
      </div>
      <div className="theirRevealedCards">
        <Hand cards={gameState.theirRevealedCards} />
      </div>
      {/* <Summary gameState={gameState}/> */}
      <div className="yourRevealedCards">
        <Hand cards={gameState.yourRevealedCards} />
      </div>
      <div className="row">
        <div className="yourUnrevealedCards column">
          <Hand cards={gameState.yourUnrevealedCards} actions={gameState.possibleActions} handleAction={handleAction} />
        </div>
        <SpeechBubble playerID={1} lastActionLog={gameState.lastActionLog} className="column" />
        <PlayerSection name="Vos" points={gameState.yourScore} imgSrc={"/img/human.jpeg"} isTheirTurn={isHumanTurn} />
      </div>
      <ActionButtons 
        className="actionButtons"
        isHumanTurn={isHumanTurn}
        actions={gameState.possibleActions}
        handleAction={handleAction} 
      />
    </div>
  );
}

function startGame() {
  document.getElementById("startGame").remove();
  const root = createRoot(document.getElementById("game"));
  const manager = new GameStateManager();
  manager.start()

  root.render(
    <StrictMode>
      <Game manager={manager}/>
    </StrictMode>
  );
}

export default function GameLandingPage() {
  // playAudio('intro');

  return (
    <>
      <div id="startGame">
        <h1>TRUCO ARGENTINO</h1>
        <div className="vsContainer">
          <img className="startGameHuman" src="/img/human.jpeg" />
          <span className="startGameVs">VS</span>
          <img className="startGameBot" src="/img/bot.png" />
        </div>
        <a id="startGameButton" onClick={startGame}>▶️</a>
      </div>
      
      <div id="game"></div>
    </>
  )
}