import {MapEventDelegate} from "event-delegate";

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
