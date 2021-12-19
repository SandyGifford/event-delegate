import * as React from "react";
import { MapStateDelegate, EventDelegateListener, MapEventDelegateAllListener } from "state-delegate"

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
