import { secretMode } from './secretMode';

export function getAudioPaths(path) {
    const specialAudioPaths = {
        "reveal_card": [
            "mp3/reveal card 1.mp3",
            "mp3/reveal card 2.mp3",
        ],
        "envido": [
            "mp3/envido 1.mp3",
            "mp3/envido 2.mp3",
            "mp3/envido 3.mp3",
            "mp3/envido 4.mp3",
            "mp3/envido 5.mp3",
            "mp3/envido 6.mp3",
            "mp3/envido 7.mp3",
        ],
        "son_buenas": [
            "mp3/son buenas 1.mp3",
            "mp3/son buenas 2.mp3",
        ],
        "son_mejores": [
            "mp3/son mejores 1.mp3",
            "mp3/son mejores 2.mp3",
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
        ],
        "press": [
            "mp3/press.m4a",
        ],
        "coin": [
            "mp3/coin.mp3",
        ],
    }
    const regularAudioPaths = {
        "press": [
            "mp3/press.m4a",
        ],
        "coin": [
            "mp3/coin.mp3",
        ],
        "reveal_card": [
            "mp3/sfx.mp3"
        ],
        "envido": [
            "mp3/sfx.mp3"
        ],
        "son_buenas": [
            "mp3/sfx.mp3"
        ],
        "son_mejores": [
            "mp3/sfx.mp3"
        ],
        "yes": [
            "mp3/sfx.mp3"
        ],
        "no": [
            "mp3/sfx.mp3"
        ],
        "intro": [],
        "finish": [
            "mp3/chan.mp3"
        ],
        "error": [
            "mp3/sfx.mp3"
        ],
        "end": [
            "mp3/sfx.mp3"
        ],
    }
    return secretMode ? specialAudioPaths[path] : regularAudioPaths[path];
}