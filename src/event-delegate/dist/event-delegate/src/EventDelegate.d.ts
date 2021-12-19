export declare type EventDelegateListener<T> = (val: T) => void;
export declare class EventDelegate<T> {
    protected listeners: EventDelegateListener<T>[];
    constructor();
    listen: (listener: EventDelegateListener<T>) => void;
    stopListen: (listener: EventDelegateListener<T>) => void;
    trigger(value: T): void;
}
//# sourceMappingURL=EventDelegate.d.ts.map