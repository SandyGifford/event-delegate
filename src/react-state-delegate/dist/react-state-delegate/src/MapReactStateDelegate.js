"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapReactStateDelegate = void 0;
const react_1 = require("react");
const state_delegate_1 = require("state-delegate");
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
//# sourceMappingURL=MapReactStateDelegate.js.map