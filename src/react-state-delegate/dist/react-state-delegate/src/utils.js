"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMounted = void 0;
const react_1 = require("react");
function useMounted() {
    const mounted = react_1.default.useRef(false);
    react_1.default.useEffect(() => {
        mounted.current = true;
        return () => { mounted.current = false; };
    }, []);
    return mounted;
}
exports.useMounted = useMounted;
//# sourceMappingURL=utils.js.map