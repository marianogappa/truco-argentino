import { useState, useEffect } from 'react';
import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { GameStateManager } from './gameState';
import SpeechBubble from './SpeechBubble';
import ActionButtons from './ActionButtons';
import { ActionButton } from './ActionButtons';
import PlayerSection from './PlayerSection';
import Hand from './Hand';
import { playAudio } from './audio';

function Game({manager}) {
  const [trigger, setTrigger] = useState(0);

  function handleAction(action) {
    setTrigger(manager.runAction(action, setTrigger))
  }

  function removeModalAndHandleAction(action) {
    const modalOverlay = document.getElementById('roundOverModalOverlay');
    modalOverlay.classList.remove('show');
    handleAction(action);
  }

  function removeModalAndLeaveGame(action) {
    const modalOverlay = document.getElementById('gameOverModalOverlay');
    modalOverlay.classList.remove('show');
    window.location.href = window.location.href;
  }

  const gameState = manager.gameState;
  const isHumanTurn = gameState.turnPlayerID === 0;
  const isBotTurn = gameState.turnPlayerID === 1;
  const confirmRoundFinishedAction = gameState.possibleActions.find(action => action.name === "confirm_round_finished");
  const leaveGameAction = {"name": "leave_game"};
  let winnerImgSrc = `${process.env.PUBLIC_URL}/img/human.jpeg`

  useEffect(() => {
    if (gameState.isGameEnded) {
      playAudio('finish', {waitMs: 500});
      const modalOverlay = document.getElementById('gameOverModalOverlay');
      if (gameState.winnerPlayerID === 1) {
        const winnerImgElem = document.getElementById('winnerImg');
        winnerImgElem.src = `${process.env.PUBLIC_URL}/img/bot.png`;
      }
      modalOverlay.classList.add('show');
    }
  }, [gameState.isGameEnded]);

  console.log(gameState)

  useEffect(() => {
    if (gameState.possibleActions.length === 1 && gameState.possibleActions[0].name === "confirm_round_finished" && !gameState.isGameEnded) {
      // This is because the bot has to confirm the round finished too, or possibly reveal envido score too.
      // Either it did, and then this should be a no-op, or it didn't and this is useful.
      // This action produces no sounds or visual changes so we just run the action alone.
      manager.runBotAction();
      manager.runBotAction();

      playAudio('end', {waitMs: 500});
      const modalOverlay = document.getElementById('roundOverModalOverlay');
      modalOverlay.classList.add('show');
    }
  }, [gameState]);

  return (
    <>
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
          </div>
          <div className="row actionButtonsRow">
            <PlayerSection className="humanPlayerSection" name="Vos" points={gameState.yourScore} imgSrc={`${process.env.PUBLIC_URL}/img/human.jpeg`} isTheirTurn={isHumanTurn} />
            <ActionButtons 
              className="actionButtons"
              isHumanTurn={isHumanTurn}
              actions={gameState.possibleActions}
              handleAction={handleAction}
              isGameEnded={gameState.isGameEnded}
            />
          </div>
        </div>
        <div className="sideColumn"></div>
      </div>
      <div id="roundOverModalOverlay" className="hidden">
        <div id="modal">
          <ActionButton action={confirmRoundFinishedAction} handleAction={removeModalAndHandleAction} />
        </div>
      </div>
      <div id="gameOverModalOverlay" className="hidden">
        <div id="modal">
          <div id="gameOverText">
            <span>🏆</span>
            <img id="winnerImg" className="playerImg" src={winnerImgSrc}/>
            <span>🏆</span>
          </div>
          <ActionButton action={leaveGameAction} handleAction={removeModalAndLeaveGame} />
        </div>
      </div>
    </>
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
  useEffect(() => {
    playAudio('intro', {waitMs: 500});
  }, []);

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