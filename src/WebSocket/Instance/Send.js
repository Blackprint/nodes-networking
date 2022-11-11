/**
 * Send data via WebSocket
 * @summary WebSocket
 * @blackprint node
 */
Blackprint.registerNode("Networking/WebSocket/Instance/Send",
class extends Blackprint.Node {
	static input = {
		Socket: WebSocket,
		Data: Blackprint.Port.Union([String, ArrayBuffer, Blob, Uint8Array]),
		Send: Blackprint.Port.Trigger(port => port.iface.node.send()),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Send data";

		this._toast = new NodeToast(iface);
	}

	send(){
		let { Input } = this.ref;
		let toast = this._toast;

		if(!Input.Socket) return toast.warn("Socket is required");
		if(!Input.Data) return toast.warn("Data is required");

		toast.clear();

		Input.Socket.send(Input.Data);
	}
});