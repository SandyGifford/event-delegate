import React from "react";
import { StateDelegate, EventDelegateListener } from "state-delegate";

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
