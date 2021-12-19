"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIListDelegate = exports.UIListDelegateDuplicateIdException = exports.UIListDelegateException = void 0;
const React = require("react");
const event_delegate_1 = require("event-delegate");
const utils_1 = require("./utils");
class UIListDelegateException extends Error {
}
exports.UIListDelegateException = UIListDelegateException;
class UIListDelegateDuplicateIdException extends UIListDelegateException {
}
exports.UIListDelegateDuplicateIdException = UIListDelegateDuplicateIdException;
class UIListDelegate {
    constructor(options) {
        this.lastId = 0;
        this.lastSetterId = 0;
        this.liveCount = 0;
        this.items = [];
        this.setters = [];
        this.animTimers = {};
        this.push = (item, id) => {
            const existingIndex = id ? this.findItemIndex(id) : -1;
            const wrappedItem = this.createItem(item, id);
            if (existingIndex === -1)
                this.items.push(wrappedItem);
            else
                this.items[existingIndex] = wrappedItem;
            this.trigger();
            return wrappedItem.id;
        };
        this.clear = (cleanUp = () => null) => {
            this.reverseForEach((item, i) => {
                const deleted = this.deleteAtIndex(i);
                if (deleted)
                    cleanUp(deleted);
            });
        };
        this.pop = () => {
            if (this.items.length)
                return this.deleteAtIndex(this.items.length - 1);
            return undefined;
        };
        this.unshift = (item, id) => {
            const existingIndex = id ? this.findItemIndex(id) : -1;
            const wrappedItem = this.createItem(item, id);
            if (existingIndex === -1)
                this.items.unshift(wrappedItem);
            else
                this.items[existingIndex] = wrappedItem;
            this.trigger();
            return wrappedItem.id;
        };
        this.addAfterId = (item, id) => {
            return this.addAtIndex(item, this.findItemIndex(id) + 1);
        };
        this.addBeforeId = (item, id) => {
            return this.addAtIndex(item, this.findItemIndex(id));
        };
        this.addAtIndex = (item, index, id) => {
            const existingIndex = id ? this.findItemIndex(id) : -1;
            const wrappedItem = this.createItem(item, id);
            if (existingIndex === -1)
                this.items.splice(index, 0, wrappedItem);
            else
                this.items[existingIndex] = wrappedItem;
            this.trigger();
            return wrappedItem.id;
        };
        this.deleteAfterId = (id) => {
            this.deleteAfterIndex(this.items.findIndex(i => i.id === id));
        };
        this.deleteAfterIndex = (index) => {
            this.reverseEvery((item, i) => {
                if (index === i)
                    return false;
                this.deleteAtIndex(i);
                return true;
            });
        };
        this.deleteById = (id) => {
            const index = this.findItemIndex(id);
            const ret = this.deleteAtIndex(index);
            this.trigger();
            return ret;
        };
        this.deleteAtIndex = (index) => {
            if (index === -1)
                return undefined;
            const { id, removeDelegate } = this.items[index];
            const { animOutMS } = this.options;
            removeDelegate.trigger();
            if (animOutMS) {
                this.items[index].animOut = true;
                this.trigger();
                this.setAnimTimer(id, animOutMS, () => {
                    const currentIndex = this.findItemIndex(id);
                    this.items.splice(currentIndex, 1);
                    this.trigger();
                });
            }
            else {
                this.items.splice(index, 1);
                this.trigger();
            }
            return { ...this.items[index] };
        };
        this.useState = () => {
            const mountedRef = (0, utils_1.useMounted)();
            const [items, setItems] = React.useState(this.items);
            React.useEffect(() => {
                const id = "" + this.lastSetterId++;
                const setterData = {
                    id,
                    setter: items => { if (mountedRef.current)
                        setItems(items); },
                };
                this.setters.push(setterData);
                return () => {
                    const index = this.setters.findIndex(setter => setter.id === id);
                    if (index === -1)
                        return;
                    this.setters.splice(index, 1);
                };
            }, []);
            return [items, this.liveCount];
        };
        this.options = {
            initial: [],
            ...options,
        };
        this.options.initial?.forEach(i => this.push(i));
    }
    addRemoveListenerByIndex(index, callback) {
        this.items[index].removeDelegate.listen(callback);
    }
    addRemoveListenerById(id, callback) {
        const index = this.findItemIndex(id);
        this.addRemoveListenerByIndex(index, callback);
    }
    removeRemoveListenerByIndex(index, callback) {
        this.items[index].removeDelegate.stopListen(callback);
    }
    removeRemoveListenerById(id, callback) {
        const index = this.findItemIndex(id);
        this.addRemoveListenerByIndex(index, callback);
    }
    forEach(callback) {
        this.items.forEach(({ item, id }, i) => callback(item, id, i));
    }
    setAnimTimer(id, duration, callback) {
        clearTimeout(this.animTimers[id]);
        this.animTimers[id] = setTimeout(() => {
            callback();
            delete this.animTimers[id];
        }, duration); // node typings... ugh...
    }
    findItemIndex(id) {
        return this.items.findIndex(i => i.id === id);
    }
    trigger() {
        this.liveCount = this.items.reduce((count, inst) => inst.animOut ? count : count + 1, 0);
        this.setters.forEach(({ setter }) => {
            // calling a setter can result in removing other setters
            if (setter)
                setter([...this.items]);
        });
    }
    createItem(item, id = "" + this.lastId++) {
        item = typeof item === "function" ? item(id) : item;
        const wrappedItem = {
            id,
            item,
            removeDelegate: new event_delegate_1.EventDelegate(),
        };
        if (this.options.notifyNotNew) {
            wrappedItem.isNew = true;
            requestAnimationFrame(() => {
                setTimeout(() => {
                    const { animInMS = 0 } = this.options;
                    const item = this.items[this.findItemIndex(id)];
                    if (!item)
                        return;
                    if (animInMS)
                        item.animIn = true;
                    item.isNew = false;
                    this.trigger();
                    this.setAnimTimer(id, animInMS, () => {
                        const item = this.items[this.findItemIndex(id)];
                        if (!item)
                            return;
                        item.animIn = false;
                        this.trigger();
                    });
                }, 10);
            });
        }
        return wrappedItem;
    }
    reverseEvery(callback) {
        for (let i = this.items.length - 1; i >= 0; i--) {
            if (!callback(this.items[i], i))
                return false;
        }
        return true;
    }
    reverseForEach(callback) {
        this.reverseEvery((item, index) => {
            callback(item, index);
            return true;
        });
    }
}
exports.UIListDelegate = UIListDelegate;
//# sourceMappingURL=UIListDelegate.js.map