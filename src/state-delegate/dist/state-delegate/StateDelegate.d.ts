import { EventDelegate, MapEventDelegate } from "event-delegate";
export * from "event-delegate";
export declare class StateDelegate<T> extends EventDelegate<T> {
    private initialValue;
    get value(): T;
    protected _value: T;
    constructor(initialValue: T);
    reset: () => void;
    trigger(value: T): void;
}
export declare class MapStateDelegate<T, K extends string = string> extends MapEventDelegate<T, K> {
    protected value: Record<K, T>;
    constructor(initialValue?: Record<K, T>);
    get: (key: K) => T;
    trigger(key: K, value: T): void;
}
//# sourceMappingURL=StateDelegate.d.ts.map