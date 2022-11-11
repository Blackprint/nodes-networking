/**
 * Close WebSocket connection
 * @summary WebSocket
 * @blackprint node
 */
Blackprint.registerNode("Networking/WebSocket/Instance/Close",
class extends Blackprint.Node {
	static input = {
		Socket: WebSocket,
		Trigger: Blackprint.Port.Trigger(port => port.iface.node.closeTrigger()),
		Code: Blackprint.Port.Default(Number, 1000),
		Reason: String,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Close connection";
	}

	closeTrigger(){
		let { Input, Output } = this.ref;
		if(!Input.Socket) return;

		Input.Socket.close(Input.Code, Input.Reason);
	}
});