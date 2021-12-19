import { StateDelegate, EventDelegateListener } from "state-delegate";
export declare class ReactStateDelegate<T> extends StateDelegate<T> {
    useWhileMounted: (listener: EventDelegateListener<T>, dependencies?: React.DependencyList) => void;
    useState: () => T;
}
//# sourceMappingURL=ReactStateDelegate.d.ts.map