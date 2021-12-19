"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapReactStateDelegate = void 0;
const React = require("react");
const state_delegate_1 = require("state-delegate");
class MapReactStateDelegate extends state_delegate_1.MapStateDelegate {
    constructor() {
        super(...arguments);
        this.useWhileMounted = (key, listener) => {
            React.useEffect(() => {
                this.listen(key, listener);
                return () => this.stopListen(key, listener);
            }, [key, listener]);
        };
        this.useAllWhileMounted = (listener) => {
            React.useEffect(() => {
                this.listenAll(listener);
                return () => this.stopListenAll(listener);
            }, [listener]);
        };
        this.useState = (key) => {
            const [state, setState] = React.useState(this.value[key]);
            this.useWhileMounted(key, setState);
            return state;
        };
    }
}
exports.MapReactStateDelegate = MapReactStateDelegate;
//# sourceMappingURL=MapReactStateDelegate.js.map