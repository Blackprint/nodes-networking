/**
 * Listen on new message
 * @summary WebSocket
 * @blackprint node
 */
Blackprint.registerNode("Networking/WebSocket/Event/Message",
class extends Blackprint.Node {
	static input = {
		Client: WebSocket,
	};
	static output = {
		/** Text message received from remote */
		TextMessage: String,
		/** Binary message received from remote */
		BinaryMessage: Blackprint.Port.Union([ArrayBuffer, Blob]),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "On Message";
	}

	update(){
		let { Input, Output } = this.ref;
		this._unlisten?.();

		let client = Input.Client;
		let callback = function(ev, isBinary){
			if(!isBinary && ev.data instanceof String)
				Output.TextMessage = ev.data;
			else Output.BinaryMessage = ev.data;
		}

		client.on('message', callback);
		this._unlisten = ()=> client.off('message', callback);
	}

	destroy(){
		this._unlisten?.();
	}
});