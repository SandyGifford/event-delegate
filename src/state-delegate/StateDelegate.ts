import { EventDelegate, MapEventDelegate } from "event-delegate";

export * from "event-delegate";

export class StateDelegate<T> extends EventDelegate<T> {
	public get value (): T {
		return this._value;
	}

	protected _value: T;

	constructor(private initialValue: T) {
		super();
		this._value = initialValue;
	}

	public reset = (): void => {
		this.trigger(this.initialValue);
	};

	public override trigger(value: T): void {
		this._value = value;
		super.trigger(value);
	}
}

export class MapStateDelegate<T, K extends string = string> extends MapEventDelegate<T, K> {
	protected value = {} as Record<K, T>;

	constructor(initialValue = {} as Record<K, T>) {
		super();
		this.value = initialValue;
	}

	public get = (key: K): T => this.value[key];

	public override trigger(key: K, value: T): void {
		this.value[key] = value;
		super.trigger(key, value);
	}
}
