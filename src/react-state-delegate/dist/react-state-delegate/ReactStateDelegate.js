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
exports.MapReactStateDelegate = exports.ReactStateDelegate = void 0;
const react_1 = require("react");
const state_delegate_1 = require("state-delegate");
__exportStar(require("state-delegate"), exports);
class ReactStateDelegate extends state_delegate_1.StateDelegate {
    constructor() {
        super(...arguments);
        this.useWhileMounted = (listener, dependencies = [listener]) => {
            react_1.default.useEffect(() => {
                this.listen(listener);
                return () => this.stopListen(listener);
            }, dependencies);
        };
        this.useState = () => {
            const [state, setState] = react_1.default.useState(this._value);
            this.useWhileMounted(setState);
            return state;
        };
    }
}
exports.ReactStateDelegate = ReactStateDelegate;
class MapReactStateDelegate extends state_delegate_1.MapStateDelegate {
    constructor() {
        super(...arguments);
        this.useWhileMounted = (key, listener) => {
            react_1.default.useEffect(() => {
                this.listen(key, listener);
                return () => this.stopListen(key, listener);
            }, [key, listener]);
        };
        this.useAllWhileMounted = (listener) => {
            react_1.default.useEffect(() => {
                this.listenAll(listener);
                return () => this.stopListenAll(listener);
            }, [listener]);
        };
        this.useState = (key) => {
            const [state, setState] = react_1.default.useState(this.value[key]);
            this.useWhileMounted(key, setState);
            return state;
        };
    }
}
exports.MapReactStateDelegate = MapReactStateDelegate;
//# sourceMappingURL=ReactStateDelegate.js.map