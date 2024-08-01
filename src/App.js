import { useState, useEffect } from 'react';
import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { GameStateManager } from './gameState';
import SpeechBubble from './SpeechBubble';
import ActionButtons from './ActionButtons';
import { ActionButton } from './ActionButtons';
import PlayerSection from './PlayerSection';
import Hand from './Hand';
import { playAudio, stopAudio, setMasterSwitchAudioOn } from './audio';
import Toggle from './Toggle';
import gameOverText from './gameOverTexts';

function Game({manager}) {
  const [trigger, setTrigger] = useState(0);

  function handleAction(action) {
    setTrigger(manager.runAction(action, setTrigger))
  }

  function removeModalAndHandleAction(action) {
    const modalOverlay = document.getElementById('roundOverModalOverlay');
    modalOverlay.classList.remove('show');
    stopAudio();
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
  const gameOverTextLinesDiv = document.getElementById('gameOverTextLines');
  let winnerImgSrc = `${process.env.PUBLIC_URL}/img/human.jpeg`
  let gameOverTextLines = [];

  useEffect(() => {
    if (gameState.isGameEnded) {
      playAudio('finish', {waitMs: 500});
      const modalOverlay = document.getElementById('gameOverModalOverlay');
      if (gameState.winnerPlayerID === 1) {
        const winnerImgElem = document.getElementById('winnerImg');
        winnerImgElem.src = `${process.env.PUBLIC_URL}/img/bot.png`;
        gameOverTextLines = gameOverText('bot');
      } else {
        gameOverTextLines = gameOverText('human');
      }
      // Clear existing content
      gameOverTextLinesDiv.innerHTML = '';

      // Add new content
      gameOverTextLines.forEach((line, i) => {
        const p = document.createElement('p');
        p.textContent = line;
        gameOverTextLinesDiv.appendChild(p);
      });

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
        <div id="roundOverModal">
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
          <div id="gameOverTextLines">
              {gameOverTextLines.map((line, i) => <p key={i}>{line}</p>)}
          </div>
          <ActionButton action={leaveGameAction} handleAction={removeModalAndLeaveGame} />
        </div>
      </div>
    </>
  );
}

function startGame({maxPoints, isFlorEnabled}) {
  stopAudio();
  document.getElementById("startGame").remove();
  const root = createRoot(document.getElementById("game"));
  const manager = new GameStateManager();
  manager.start({maxPoints, isFlorEnabled});

  root.render(
    <StrictMode>
      <Game manager={manager}/>
    </StrictMode>
  );
}

export default function GameLandingPage() {
  const [maxPoints, setMaxPoints] = useState(15);
  const [audioOn, setAudioOn] = useState(true);
  const [isFlorEnabled, setIsFlorEnabled] = useState(false);
  const continueAction = {"name": "continue"};

  function showInfoModal() {
    const modalOverlay = document.getElementById('infoModal');
    modalOverlay.classList.remove('hidden');
    modalOverlay.classList.add('show');
  }

  function hideInfoModal() {
    const modalOverlay = document.getElementById('infoModal');
    modalOverlay.classList.add('hidden');
    modalOverlay.classList.remove('show');
  }

  useEffect(() => {
    playAudio('intro', {waitMs: 500});
  }, []);

  useEffect(() => {
    setMasterSwitchAudioOn(audioOn);
    if (!audioOn) {
      stopAudio();
    }
  }, [audioOn]);

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
            <a id="startGameButton" onClick={() => startGame({maxPoints, isFlorEnabled})}>▶️</a>
            <Toggle option1Caption={15} option2Caption={30} option1Value={15} option2Value={30} value={maxPoints} onChange={setMaxPoints} />
            <Toggle option1Caption={"🔊"} option2Caption={"🔇"} option1Value={true} option2Value={false} value={audioOn} onChange={setAudioOn} />
            <Toggle option1Caption={"🥀"} option2Caption={"🌹"} option1Value={false} option2Value={true} value={isFlorEnabled} onChange={setIsFlorEnabled} />
            <span id="info_link" onClick={showInfoModal}>info</span>
          </div>
          <div className="sideColumn"></div>
        </div>
      </div>
      <div id="infoModal" className="hidden">
        <div id="infoText">
        <p>Este juego está basado en y dedicado al primer juego de computadora argentino, <a href="https://www-2.dc.uba.ar/charlas/lud/truco/" target="_blank">
            Truco Arbiser (1982)</a>. 
             Incluye arte del juego original (imágenes, efectos de sonido y textos), pero el motor del juego y la interfaz de usuario están 
            construidos desde cero. No hay intención de lucro ni ads, solo la esperanza de que las nuevas generaciones puedan experimentar
            algunos de los momentos divertidos que vivimos en los años 90.
          </p>

          <p>El motor es open source, con licencia MIT, y acepto issues & PRs. Soporta multijugador (humano vs humano).
            Está construído para ser fácilmente extensible: se pueden crear distintas UIs, se pueden agregar nuevos bots, etc.
          </p>
          <hr />
          <p>This game is based on and dedicated to the first Argentinian computer game, <a href="https://www-2.dc.uba.ar/charlas/lud/truco/" target="_blank">
            Truco Arbiser (1982)</a>.
             It includes art from the original game (images, sound fx and texts), but the game engine and UI are built from scratch.
            There is no intention of profit, no ads—just the hope that new generations can experience some of the fun moments we enjoyed
            in the 90s.
          </p>

          <p>The engine is open source, MIT licensed, and I accept issues & PRs. It supports multiplayer (human vs human).
            It's built to be easily extensible: different UIs can be created, new bots can be added, etc.
          </p>

          <p><a href="https://github.com/marianogappa/truco" target="_blank">Game engine</a> - <a href="https://github.com/marianogappa/truco-argentino" target="_blank">This UI</a> </p>
          <ActionButton action={continueAction} handleAction={hideInfoModal} />
        </div>
      </div>
      
      <div id="game"></div>
    </>
  )
}