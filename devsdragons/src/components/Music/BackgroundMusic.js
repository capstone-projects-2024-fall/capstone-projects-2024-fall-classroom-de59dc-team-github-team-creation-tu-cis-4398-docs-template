// BackgroundMusic.js

export default class BackgroundMusic {
    constructor(audioFilePath) {
        this.audio = new Audio(audioFilePath);
        this.audio.loop = true; // for looping
        this.audio.volume = 0.5; // initial volume (random val for now)
    }

    play() {
        //debug purposes (prevents replaying)
        if (!this.audio.paused) return; 
        this.audio.play().catch(err => {
            console.error("Audio playback error:", err);
        });
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0; // Reset playback to the start
    }

    setVolume(volume) {
        if (volume < 0 || volume > 1) {
            console.error("Volume must be between 0 and 1");
            return;
        }
        this.audio.volume = volume;
    }
}
