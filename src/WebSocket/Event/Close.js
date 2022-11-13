/**
 * Listen on connection close
 * @summary WebSocket
 * @blackprint node
 */
Blackprint.registerNode("Networking/WebSocket/Event/Close",
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
		iface.title = "On Close";
	}

	update(){
		let { Input, Output } = this.ref;
		this._unlisten?.();

		let client = Input.Client;
		let callback = ev => { Output.Close = ev; }

		client.on('close', callback);
		this._unlisten = ()=> client.off('close', callback);
	}

	destroy(){
		this._unlisten?.();
	}
});