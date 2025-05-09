import BaseService from "./base.service.js";
import backgroundMusic from "../assets/audio/background-music.mp3";
import buttonHoverSound from "../assets/audio/button-hover.mp3";
import buttonClickSound from "../assets/audio/button-click.mp3";
import services from "../dependency-injection.js";

class AudioService extends BaseService {
    constructor() {
        super();

        this.bgAudio = new Audio(backgroundMusic);
        this.bgAudio.loop = true;

        this.buttonHoverSound = new Audio(buttonHoverSound);
        this.buttonHoverSound.volume = services.settingsService.getSettingOrDefault("sfxVolume", 50) / 100;

        this.buttonClickSound = new Audio(buttonClickSound);
        this.buttonClickSound.volume = services.settingsService.getSettingOrDefault("sfxVolume", 50) / 100;

        this.bgAudio.volume = services.settingsService.getSettingOrDefault("bgVolume", 50) / 100;

        services.settingsService.addEventListener("settingsChanged", (settings) => {
            this.bgAudio.volume = settings.bgVolume / 100;
            this.buttonClickSound.volume = settings.sfxVolume / 100;
            this.buttonHoverSound.volume = settings.sfxVolume / 100;
        });

    }

    startBackgroundMusic() {
        this.bgAudio.play();
    }

    stopBackgroundMusic() {
        if (this.bgAudio) {
            this.bgAudio.pause();
            this.bgAudio.currentTime = 0;
        }
    }

    playHoverSound() {
        this.buttonHoverSound.currentTime = 0; // Reset the sound to the beginning
        this.buttonHoverSound.play();
    }

    playClickSound() {
        this.buttonClickSound.currentTime = 0; // Reset the sound to the beginning
        this.buttonClickSound.play();
    }
}

export default AudioService;
