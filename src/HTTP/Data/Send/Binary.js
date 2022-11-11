/**
 * @summary HTTP Data Send
 * @blackprint
 */
Blackprint.registerNode("Networking/HTTP/Data/Send/Binary",
class extends Blackprint.Node {
	static input = {
		Data: Blackprint.Port.Union([Uint8Array, Blob]),
	};
	static output = {
		Data: Context.VirtualType(Object, "BodyEncoded"),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Binary";
	}

	update(){
		let { Input, Output } = this.ref;

		Output.Data = {
			type: 'application/octet-stream',
			data: Input.Data,
		};
	}
});