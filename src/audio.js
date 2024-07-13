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
}

let audioQueue = [];
let audio = null;
let isPlaying = false;

export function playAudio(audioType, enqueue = false) {
    const paths = audioPaths[audioType];
    if (!paths) {
        return;
    }

    const path = paths[Math.floor(Math.random() * paths.length)];
    
    if (enqueue && isPlaying) {
        // Enqueue the new audio path
        audioQueue.push(path);
    } else {
        // Clear the queue and play immediately
        audioQueue = [path];
        playNextAudio();
    }
}

function playNextAudio() {
    if (audioQueue.length === 0) {
        isPlaying = false;
        return;
    }

    isPlaying = true;
    const path = audioQueue.shift();
    audio = new Audio(path);
    audio.play();
    
    audio.onended = () => {
        window.setTimeout(() => { playNextAudio() }, 300);
    };
}
