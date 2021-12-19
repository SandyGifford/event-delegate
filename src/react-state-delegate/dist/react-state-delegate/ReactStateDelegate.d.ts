import { StateDelegate, MapStateDelegate, EventDelegateListener, MapEventDelegateAllListener } from "../state-delegate/StateDelegate";
export * from "../state-delegate/StateDelegate";
export declare class ReactStateDelegate<T> extends StateDelegate<T> {
    useWhileMounted: (listener: EventDelegateListener<T>, dependencies?: React.DependencyList) => void;
    useState: () => T;
}
export declare class MapReactStateDelegate<T, K extends string = string> extends MapStateDelegate<T, K> {
    useWhileMounted: (key: K, listener: EventDelegateListener<T>) => void;
    useAllWhileMounted: (listener: MapEventDelegateAllListener<T>) => void;
    useState: (key: K) => T;
}
//# sourceMappingURL=ReactStateDelegate.d.ts.map