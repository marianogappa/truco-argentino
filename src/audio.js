import { getAudioPaths } from "./audioPaths.js";

let currentAudio = null;
let audioQueue = [];
let masterSwitchAudioOn = true;

export function setMasterSwitchAudioOn(value) {
    masterSwitchAudioOn = value;
}

export function playAudio(audioType, config = {}) {
    if (!masterSwitchAudioOn) {
        return;
    }

    const { enqueue = false, separate = false, volume = 100, waitMs = 0 } = config;
    
    const paths = getAudioPaths(audioType);
    if (!paths) {
        return;
    }

    const path = paths[Math.floor(Math.random() * paths.length)];

    const audio = new Audio(path);
    audio.volume = volume / 100;

    if (separate) {
        _playWithWait(audio, waitMs);
        return;
    }

    if (enqueue) {
        audioQueue.push(audio);
        if (audioQueue.length === 1) {
            _playNextInQueue();
        }
        return;
    }

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = audio;
    _playWithWait(null, waitMs);
}

export function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
    }
}

function _playWithWait(otherAudio, waitMs) {
    if (!waitMs) {
        _play(otherAudio);
    } else {
        setTimeout(() => { _play() }, waitMs);
    }
}

function _play(otherAudio) {
    (otherAudio || currentAudio).play().catch(error => console.error("Error playing audio:", error));
}

function _playNextInQueue() {
    if (audioQueue.length === 0) return;

    const nextAudio = audioQueue.shift();
    currentAudio = nextAudio;

    nextAudio.play().then(() => {
        nextAudio.onended = _playNextInQueue;
    }).catch(error => console.error("Error playing audio:", error));
}
