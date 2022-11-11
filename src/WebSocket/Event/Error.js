/**
 * Listen on error
 * @summary WebSocket
 * @blackprint node
 */
Blackprint.registerNode("Networking/WebSocket/Event/Error",
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
		iface.title = "On Error";
	}

	update(){
		let { Input, Output } = this.ref;
		this._unlisten?.();

		let client = Input.Client;
		let callback = ev => { Output.Error = ev; }

		client.addEventListener('error', callback);
		this._unlisten = function(){
			client.removeEventListener('error', callback);
		}
	}

	destroy(){
		this._unlisten?.();
	}
});