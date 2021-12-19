"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMounted = void 0;
const React = require("react");
function useMounted() {
    const mounted = React.useRef(false);
    React.useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);
    return mounted;
}
exports.useMounted = useMounted;
//# sourceMappingURL=utils.js.map