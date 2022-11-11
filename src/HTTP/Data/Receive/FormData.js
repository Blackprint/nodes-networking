Blackprint.registerNode("Networking/HTTP/Data/Receive/FormData",
class extends Blackprint.Node {
	static input = {Body: Response};
	static output = {Data: FormData};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "As FormData";
	}
	async update(){
		let { Input, Output } = this.ref;
		if(Input.Body == null) return;

		Output.Data = await Input.Body.formData();
	}
});