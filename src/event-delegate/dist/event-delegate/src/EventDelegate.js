"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDelegate = void 0;
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
//# sourceMappingURL=EventDelegate.js.map