Blackprint.registerNode("Networking/HTTP/Data/Receive/Text",
class extends Blackprint.Node {
	static input = {Body: Response};
	static output = {Data: String};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "As Text";
	}
	async update(){
		let { Input, Output } = this.ref;
		if(Input.Body == null) return;

		Output.Data = await Input.Body.text();
	}
});