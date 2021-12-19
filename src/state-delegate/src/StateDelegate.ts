import { EventDelegate } from "event-delegate";

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
