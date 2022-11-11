Blackprint.registerNode("Networking/HTTP/Data/Receive/JSON",
class extends Blackprint.Node {
	static input = {Body: Response};
	static output = {Data: Object};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "As JSON";
	}
	async update(){
		let { Input, Output } = this.ref;
		if(Input.Body == null) return;

		Output.Data = await Input.Body.json();
	}
});