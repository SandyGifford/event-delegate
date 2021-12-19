import { EventDelegate } from "event-delegate";
export declare class StateDelegate<T> extends EventDelegate<T> {
    private initialValue;
    get value(): T;
    protected _value: T;
    constructor(initialValue: T);
    reset: () => void;
    trigger(value: T): void;
}
//# sourceMappingURL=StateDelegate.d.ts.map