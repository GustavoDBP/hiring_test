import BaseService from "./base.service.js";

class SettingsService extends BaseService {
    constructor() {
        super();

        const bgVolume = localStorage.getItem("bgVolume") || 50;
        const sfxVolume = localStorage.getItem("sfxVolume") || 50;

        this.settings = {
            bgVolume,
            sfxVolume
        };
    }

    getSettings() {
        return this.settings;
    }

    getSettingOrDefault(key, defaultValue) {
        let settings = this.getSettings();

        if (settings[key] === undefined) {
            settings[key] = defaultValue;
        }

        return settings[key];
    }

    setSetting(key, value) {
        this.settings[key] = value;
        localStorage.setItem(key, value);
        this.dispatchEvent("settingsChanged", this.settings);
    }
}

export default SettingsService;
