import { MapEventDelegate } from "event-delegate";
export declare class MapStateDelegate<T, K extends string = string> extends MapEventDelegate<T, K> {
    protected value: Record<K, T>;
    constructor(initialValue?: Record<K, T>);
    get: (key: K) => T;
    trigger(key: K, value: T): void;
}
//# sourceMappingURL=MapStateDelegate.d.ts.map