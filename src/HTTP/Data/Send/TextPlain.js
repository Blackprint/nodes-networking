Blackprint.registerNode("Network/HTTP/Data/Send/TextPlain",
class extends Blackprint.Node {
	static input = {
		/** You can right click this port to create a new port */
		Data: String,
	};
	static output = {
		Data: Context.VirtualType(Object, "BodyEncoded"),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Text Plain";
	}

	update(){
		let { Input, Output } = this.ref;
		Output.Data = {
			type: 'text/plain',
			data: Input.Data,
		};
	}
});