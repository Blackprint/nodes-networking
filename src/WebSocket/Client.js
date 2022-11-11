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
	};
	static output = {
		Client: WebSocket,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "WebSocket Client";
	}

	update(){
		let { Input, Output } = this.ref;
		if(!Input.URL) return;

		let temp = new WebSocket(Input.URL);
		temp.binaryType = Input.BinaryType;

		Output.Client = temp;
	}
});