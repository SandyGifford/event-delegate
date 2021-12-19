"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapStateDelegate = void 0;
const event_delegate_1 = require("event-delegate");
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
//# sourceMappingURL=MapStateDelegate.js.map