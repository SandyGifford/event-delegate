"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapStateDelegate = exports.StateDelegate = void 0;
const event_delegate_1 = require("event-delegate");
__exportStar(require("event-delegate"), exports);
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
class MapStateDelegate extends event_delegate_1.MapEventDelegate {
    constructor(initialValue = {}) {
        super();
        this.value = {};
        this.get = (key) => this.value[key];
        this.value = initialValue;
    }
    trigger(key, value) {
        this.value[key] = value;
        super.trigger(key, value);
    }
}
exports.MapStateDelegate = MapStateDelegate;
//# sourceMappingURL=StateDelegate.js.map