import { useState, useEffect } from 'react';
import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { GameStateManager } from './gameState';
import SpeechBubble from './SpeechBubble';
import ActionButtons from './ActionButtons';
import PlayerSection from './PlayerSection';
import Hand from './Hand';

function Game({manager}) {
  const [trigger, setTrigger] = useState(0);

  function handleAction(action) {
    setTrigger(manager.runAction(action, setTrigger))
  }

  const gameState = manager.gameState;

  const isHumanTurn = gameState.turnPlayerID === 0;
  const isBotTurn = gameState.turnPlayerID === 1;

  useEffect(() => {
    if (gameState.isEnded) {
      alert(`Game ended. ${gameState.winnerID === 0 ? "Ganaste!" : "Perdiste!"}`);
    }
  }, [gameState.isEnded]);

  console.log(gameState)

  return (
    <div className="viewportContainer">
      <div className="sideColumn"></div>
      <div className="gameContainer">
        <div className="row">
          <PlayerSection name="Bot" points={gameState.theirScore} imgSrc={`${process.env.PUBLIC_URL}/img/bot.png`} isTheirTurn={isBotTurn} />
          <SpeechBubble playerID={0} lastActionLog={gameState.lastActionLog} className="column" />
        </div>
        <div className="row">
          <div className="theirUnrevealedCards column">
            <Hand cards={gameState.theirDisplayUnrevealedCards} />
          </div>
        </div>
        <div className="theirRevealedCards row">
          <Hand cards={gameState.theirRevealedCards} />
        </div>
        <div className="row">
        </div>
        <div className="yourRevealedCards row">
          <Hand cards={gameState.yourRevealedCards} />
        </div>
        <div className="row">
          <div className="yourUnrevealedCards column">
            <Hand cards={gameState.yourDisplayUnrevealedCards} actions={gameState.possibleActions} handleAction={handleAction} />
          </div>
          {/* <SpeechBubble playerID={1} lastActionLog={gameState.lastActionLog} className="column" /> */}
        </div>
        <div className="row actionButtonsRow">
          <PlayerSection className="humanPlayerSection" name="Vos" points={gameState.yourScore} imgSrc={`${process.env.PUBLIC_URL}/img/human.jpeg`} isTheirTurn={isHumanTurn} />
          <ActionButtons 
            className="actionButtons"
            isHumanTurn={isHumanTurn}
            actions={gameState.possibleActions}
            handleAction={handleAction} 
          />
        </div>
      </div>
      <div className="sideColumn"></div>
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
  return (
    <>
      <div id="startGame">
        <div className="landingContainer">
          <div className="sideColumn"></div>
          <div className="landingContent">
            <h1>TRUCO</h1>
            <div className="vsContainer">
              <img className="startGameHuman" src={`${process.env.PUBLIC_URL}/img/human.jpeg`} />
              <span className="startGameVs">VS</span>
              <img className="startGameBot" src={`${process.env.PUBLIC_URL}/img/bot.png`} />
            </div>
            <a id="startGameButton" onClick={startGame}>▶️</a>
          </div>
          <div className="sideColumn"></div>
        </div>
      </div>
      
      <div id="game"></div>
    </>
  )
}