"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapEventDelegate = exports.EventDelegate = void 0;
class EventDelegate {
    constructor() {
        this.listeners = [];
        this.listen = (listener) => {
            const index = this.listeners.indexOf(listener);
            if (index === -1)
                this.listeners.push(listener);
        };
        this.stopListen = (listener) => {
            const index = this.listeners.indexOf(listener);
            if (index !== -1)
                this.listeners.splice(index, 1);
        };
        this.trigger = this.trigger.bind(this);
    }
    trigger(value) {
        this.listeners.forEach(l => l(value));
    }
}
exports.EventDelegate = EventDelegate;
class MapEventDelegate {
    constructor() {
        // for some reason the generic here requires that we cast the object
        this.listeners = {};
        this.allListeners = [];
        this.listen = (key, listener) => {
            if (!this.listeners[key])
                this.listeners[key] = [];
            const index = this.listeners[key].indexOf(listener);
            if (index === -1)
                this.listeners[key].push(listener);
        };
        this.stopListen = (key, listener) => {
            if (!this.listeners[key])
                return;
            const index = this.listeners[key].indexOf(listener);
            if (index !== -1)
                this.listeners[key].splice(index, 1);
            if (!this.listeners[key].length)
                delete this.listeners[key];
        };
        this.listenAll = (listener) => {
            const index = this.allListeners.indexOf(listener);
            if (index === -1)
                this.allListeners.push(listener);
        };
        this.stopListenAll = (listener) => {
            const index = this.allListeners.indexOf(listener);
            if (index !== -1)
                this.allListeners.splice(index, 1);
        };
        this.trigger = this.trigger.bind(this);
    }
    trigger(key, value) {
        (this.listeners[key] || []).forEach(l => l(value));
        (this.allListeners || []).forEach(l => l(key, value));
    }
}
exports.MapEventDelegate = MapEventDelegate;
//# sourceMappingURL=EventDelegate.js.map