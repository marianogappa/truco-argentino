var audioPaths = {
    "reveal_card": [
        "mp3/reveal card 1.mp3",
        "mp3/reveal card 2.mp3",
        "mp3/reveal card 3.mp3",
    ],
    "envido": [
        "mp3/envido 1.mp3",
        "mp3/envido 2.mp3",
        "mp3/envido 3.mp3",
        "mp3/envido 4.mp3",
        "mp3/envido 5.mp3",
        "mp3/envido 6.mp3",
        "mp3/envido 7.mp3",
        "mp3/envido 8.mp3",
        "mp3/envido 9.mp3",
        "mp3/envido 10.mp3",
        "mp3/envido 11.mp3",
        "mp3/envido 12.mp3",
        "mp3/envido 13.mp3",
        "mp3/envido 14.mp3",
    ],
    "son_buenas":  [
        "mp3/son buenas 1.mp3",
        "mp3/son buenas 2.mp3",
        "mp3/son buenas 3.mp3",
    ],
    "son_mejores": [
        "mp3/son mejores 1.mp3",
        "mp3/son mejores 2.mp3",
        "mp3/son mejores 3.mp3",
        "mp3/son mejores 4.mp3",
        "mp3/son mejores 5.mp3",
    ],
    "yes": [
        "mp3/yes 1.mp3",
        "mp3/yes 2.mp3",
        "mp3/yes 3.mp3",
        "mp3/yes 4.mp3",
        "mp3/yes 5.mp3",
    ],
    "no": [
        "mp3/no 1.mp3",
        "mp3/no 2.mp3",
    ],
    "intro": [
        "mp3/intro.mp3",
    ],
    "finish": [
        "mp3/finish 1.mp3",
        "mp3/finish 2.mp3",
    ],
    "error": [
        "mp3/error.mp3",
    ],
    "end": [
        "mp3/end 1.mp3",
        "mp3/end 2.mp3",
        "mp3/end 3.mp3",
        "mp3/end 4.mp3",
        "mp3/end 5.mp3",
        "mp3/end 6.mp3",
        "mp3/end 7.mp3",
        "mp3/end 8.mp3",
        "mp3/end 9.mp3",
        "mp3/end 10.mp3",
        "mp3/end 11.mp3",
        "mp3/end 12.mp3",
        "mp3/end 13.mp3",
        "mp3/end 14.mp3",
    ],
    "press": [
        "mp3/press.m4a",
    ],
    "coin": [
        "mp3/coin.mp3",
    ],
}

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
    
    const paths = audioPaths[audioType];
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
    _playWithWait(waitMs);
}

export function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
    }
}

function _playWithWait(waitMs) {
    if (!waitMs) {
        _play();
    } else {
        setTimeout(() => { _play() }, waitMs);
    }
}

function _play() {
    currentAudio.play().catch(error => console.error("Error playing audio:", error));
}

function _playNextInQueue() {
    if (audioQueue.length === 0) return;

    const nextAudio = audioQueue.shift();
    currentAudio = nextAudio;

    nextAudio.play().then(() => {
        nextAudio.onended = _playNextInQueue;
    }).catch(error => console.error("Error playing audio:", error));
}
