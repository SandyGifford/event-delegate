"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactStateDelegate = void 0;
const react_1 = require("react");
const state_delegate_1 = require("state-delegate");
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
//# sourceMappingURL=ReactStateDelegate.js.map