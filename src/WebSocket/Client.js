/**
 * Create client instance for WebSocket connection
 * @summary WebSocket
 * @blackprint node
 */
Blackprint.registerNode("Networking/WebSocket/Client",
class extends Blackprint.Node {
	static input = {
		/** WebSocket server's URL */
		URL: String,
		BinaryType: Blackprint.Port.Default(String, "arraybuffer"),
		ReconnectInterval: Blackprint.Port.Default(Number, 3000),
	};
	static output = {
		Client: WebSocket,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "WebSocket Client";

		this._toast = new NodeToast(iface);
	}

	update(){
		let { Input, Output } = this.ref;
		if(!Input.URL) return;

		let temp = new ReconnectableWebSocket(Input.URL, this._toast);
		temp.binaryType = Input.BinaryType;
		temp._reconnectInterval = Input.ReconnectInterval;

		temp.connect();
		Output.Client = temp;
	}
});

class ReconnectableWebSocket extends WebSocket {
	constructor(url, _toast){
		this._url = url;
		this._toast = _toast;
		this._closed = false;

		this._Ev_close = ev => {
			_toast.warn("Disconnected");
			this.emit('close', ev);
			setTimeout(() => this._connect(), this._reconnectInterval);
		};
		this._Ev_open = ev => { _toast.clear(); _toast.success("Connected"); this.emit('open', ev); }
		this._Ev_message = ev => { this.emit('message', ev); }
		this._Ev_error = ev => { _toast.error("Error"); this.emit('error', ev); }
	}

	get bufferedAmount(){ return this._ws.bufferedAmount }
	get extensions(){ return this._ws.extensions }
	get protocol(){ return this._ws.protocol }
	get readyState(){ return this._ws.readyState }
	get url(){ return this._ws.url }

	connect(){
		this._closed = false;
		this._connect();
	}

	_connect(){
		this._ws?._destroy();
		this._toast.warn("Connecting");

		let ws = this._ws = new WebSocket(this._url);
		ws.binaryType = this.binaryType;

		ws.addEventListener('close', this._Ev_close);
		ws.addEventListener('open', this._Ev_open);
		ws.addEventListener('message', this._Ev_message);
		ws.addEventListener('error', this._Ev_error);

		ws._destroy = function(){
			ws.removeEventListener('close', this._Ev_close);
			ws.removeEventListener('open', this._Ev_open);
			ws.removeEventListener('message', this._Ev_message);
			ws.removeEventListener('error', this._Ev_error);
		}
	}

	send(){
		this._ws.send.apply(this._ws, arguments);
	}

	close(){
		if(this._ws == null) return;

		this._ws.close.apply(this._ws, arguments);
		this._closed = true;

		this._ws._destroy();
	}

	addEventListener(){ this.on.apply(this, arguments) }
	removeEventListener(){ this.off.apply(this, arguments) }
	dispatchEvent(){ throw new Error("Not implemented") }
}

// Extends prototype with CustomEvent
Object.assign(ReconnectableWebSocket.prototype, Blackprint.Engine.CustomEvent.prototype);