import React from "react";
import { StateDelegate, MapStateDelegate, EventDelegateListener, MapEventDelegateAllListener } from "state-delegate";

export * from "state-delegate";

export class ReactStateDelegate<T> extends StateDelegate<T> {
	public useWhileMounted = (listener: EventDelegateListener<T>, dependencies: React.DependencyList = [listener]): void => {
		React.useEffect(() => {
			this.listen(listener);
			return () => this.stopListen(listener);
		}, dependencies);
	};

	public useState = (): T => {
		const [state, setState] = React.useState(this._value);
		this.useWhileMounted(setState);
		return state;
	};

}

export class MapReactStateDelegate<T, K extends string = string> extends MapStateDelegate<T, K> {
	public useWhileMounted = (key: K, listener: EventDelegateListener<T>): void => {
		React.useEffect(() => {
			this.listen(key, listener);
			return () => this.stopListen(key, listener);
		}, [key, listener]);
	};

	public useAllWhileMounted = (listener: MapEventDelegateAllListener<T>): void => {
		React.useEffect(() => {
			this.listenAll(listener);
			return () => this.stopListenAll(listener);
		}, [listener]);
	};

	public useState = (key: K): T => {
		const [state, setState] = React.useState(this.value[key]);
		this.useWhileMounted(key, setState);
		return state;
	};
}
