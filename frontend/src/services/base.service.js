class BaseService {
    constructor() {
        this.eventListeners = new Map();
    }

    addEventListener(eventName, callback) {
        const listeners = this.eventListeners.get(eventName) || [];
        listeners.push(callback);
        this.eventListeners.set(eventName, listeners);
    }

    dispatchEvent(eventName, args) {
        const listeners = this.eventListeners.get(eventName);
        if (listeners) {
            listeners.forEach(listener => listener(args));
        }
    }

    removeEventListener(eventName, callback) {
        const listeners = this.eventListeners.get(eventName);
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
            if (listeners.length === 0) {
                this.eventListeners.delete(eventName);
            }
        }
    }
}

export default BaseService;