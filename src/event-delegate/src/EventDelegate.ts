export type EventDelegateListener<T> = (val: T) => void;

export class EventDelegate<T> {
	protected listeners: EventDelegateListener<T>[] = [];

	constructor() {
		this.trigger = this.trigger.bind(this);
	}

	public listen = (listener: EventDelegateListener<T>): void => {
		const index = this.listeners.indexOf(listener);
		if (index === -1) this.listeners.push(listener);
	};

	public stopListen = (listener: EventDelegateListener<T>): void => {
		const index = this.listeners.indexOf(listener);
		if (index !== -1) this.listeners.splice(index, 1);
	};

	public trigger(value: T): void {
		this.listeners.forEach(l => l(value));
	}
}
