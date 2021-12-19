import { EventDelegate } from "event-delegate";
export declare class UIListDelegateException extends Error {
}
export declare class UIListDelegateDuplicateIdException extends UIListDelegateException {
}
export declare type UIListDelegateIDInjector<T> = T | ((id: string) => T);
export interface UIListDelegateOptions<T> {
    initial?: T[];
    animOutMS?: number;
    animInMS?: number;
    notifyNotNew?: boolean;
}
export interface UIListDelegateItem<T> {
    id: string;
    item: T;
    animOut?: boolean;
    animIn?: boolean;
    isNew?: boolean;
    removeDelegate: EventDelegate<void>;
}
export declare class UIListDelegate<T> {
    private lastId;
    private lastSetterId;
    private options;
    private liveCount;
    private items;
    private setters;
    private animTimers;
    constructor(options?: UIListDelegateOptions<T>);
    push: (item: UIListDelegateIDInjector<T>, id?: string | undefined) => string;
    clear: (cleanUp?: (item: UIListDelegateItem<T>) => void) => void;
    pop: () => UIListDelegateItem<T> | undefined;
    unshift: (item: UIListDelegateIDInjector<T>, id?: string | undefined) => string;
    addAfterId: (item: UIListDelegateIDInjector<T>, id: string) => string;
    addBeforeId: (item: UIListDelegateIDInjector<T>, id: string) => string;
    addAtIndex: (item: UIListDelegateIDInjector<T>, index: number, id?: string | undefined) => string;
    deleteAfterId: (id: string) => void;
    deleteAfterIndex: (index: number) => void;
    deleteById: (id: string) => UIListDelegateItem<T> | undefined;
    deleteAtIndex: (index: number) => UIListDelegateItem<T> | undefined;
    useState: () => [UIListDelegateItem<T>[], number];
    addRemoveListenerByIndex(index: number, callback: () => void): void;
    addRemoveListenerById(id: string, callback: () => void): void;
    removeRemoveListenerByIndex(index: number, callback: () => void): void;
    removeRemoveListenerById(id: string, callback: () => void): void;
    forEach(callback: (item: T, id: string, index: number) => void): void;
    private setAnimTimer;
    private findItemIndex;
    private trigger;
    private createItem;
    private reverseEvery;
    private reverseForEach;
}
//# sourceMappingURL=UIListDelegate.d.ts.map