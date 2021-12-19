import { EventDelegateListener } from "./EventDelegate";
export declare type MapEventDelegateAllListener<T, K extends string = string> = (key: K, val: T) => void;
export declare class MapEventDelegate<T, K extends string = string> {
    protected listeners: Record<K, EventDelegateListener<T>[]>;
    protected allListeners: MapEventDelegateAllListener<T, K>[];
    constructor();
    listen: (key: K, listener: EventDelegateListener<T>) => void;
    stopListen: (key: K, listener: EventDelegateListener<T>) => void;
    trigger(key: K, value: T): void;
    listenAll: (listener: MapEventDelegateAllListener<T>) => void;
    stopListenAll: (listener: MapEventDelegateAllListener<T>) => void;
}
//# sourceMappingURL=MapEventDelegate.d.ts.map