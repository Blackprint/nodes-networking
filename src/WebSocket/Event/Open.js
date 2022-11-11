/**
 * Listen on connection open
 * For Client
 * @summary WebSocket
 * @blackprint node
 */
Blackprint.registerNode("Networking/WebSocket/Event/Open",
class extends Blackprint.Node {
	static input = {
		Client: WebSocket,
	};
	static output = {
		Event: Event,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "On Open";
	}

	update(){
		let { Input, Output } = this.ref;
		this._unlisten?.();

		let client = Input.Client;
		let callback = ev => { Output.Open = ev; }

		client.addEventListener('open', callback);
		this._unlisten = function(){
			client.removeEventListener('open', callback);
		}
	}

	destroy(){
		this._unlisten?.();
	}
});