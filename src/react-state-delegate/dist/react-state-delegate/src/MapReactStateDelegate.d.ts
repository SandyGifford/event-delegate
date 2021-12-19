import { MapStateDelegate, EventDelegateListener, MapEventDelegateAllListener } from "state-delegate";
export declare class MapReactStateDelegate<T, K extends string = string> extends MapStateDelegate<T, K> {
    useWhileMounted: (key: K, listener: EventDelegateListener<T>) => void;
    useAllWhileMounted: (listener: MapEventDelegateAllListener<T>) => void;
    useState: (key: K) => T;
}
//# sourceMappingURL=MapReactStateDelegate.d.ts.map