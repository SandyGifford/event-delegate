import {EventDelegateListener} from "./EventDelegate";

export type MapEventDelegateAllListener<T, K extends string = string> = (key: K, val: T) => void;

export class MapEventDelegate<T, K extends string = string> {
	// for some reason the generic here requires that we cast the object
	protected listeners = {} as Record<K, EventDelegateListener<T>[]>;
	protected allListeners: MapEventDelegateAllListener<T, K>[] = [];

	constructor() {
		this.trigger = this.trigger.bind(this);
	}

	public listen = (key: K, listener: EventDelegateListener<T>): void => {
		if (!this.listeners[key]) this.listeners[key] = [];
		const index = this.listeners[key].indexOf(listener);
		if (index === -1) this.listeners[key].push(listener);
	};

	public stopListen = (key: K, listener: EventDelegateListener<T>): void => {
		if (!this.listeners[key]) return;
		const index = this.listeners[key].indexOf(listener);
		if (index !== -1) this.listeners[key].splice(index, 1);
		if (!this.listeners[key].length) delete this.listeners[key];
	};

	public trigger(key: K, value: T): void {
		(this.listeners[key] || []).forEach(l => l(value));
		(this.allListeners || []).forEach(l => l(key, value));
	}

	public listenAll = (listener: MapEventDelegateAllListener<T>): void => {
		const index = this.allListeners.indexOf(listener);
		if (index === -1) this.allListeners.push(listener);
	};

	public stopListenAll = (listener: MapEventDelegateAllListener<T>): void => {
		const index = this.allListeners.indexOf(listener);
		if (index !== -1) this.allListeners.splice(index, 1);
	};
}
