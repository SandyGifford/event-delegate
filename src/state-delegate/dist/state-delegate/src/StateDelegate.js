"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateDelegate = void 0;
const event_delegate_1 = require("event-delegate");
class StateDelegate extends event_delegate_1.EventDelegate {
    constructor(initialValue) {
        super();
        this.initialValue = initialValue;
        this.reset = () => {
            this.trigger(this.initialValue);
        };
        this._value = initialValue;
    }
    get value() {
        return this._value;
    }
    trigger(value) {
        this._value = value;
        super.trigger(value);
    }
}
exports.StateDelegate = StateDelegate;
//# sourceMappingURL=StateDelegate.js.map