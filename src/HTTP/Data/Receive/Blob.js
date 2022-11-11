/**
 * @summary HTTP Data Receive
 * @blackprint
 */
Blackprint.registerNode("Networking/HTTP/Data/Receive/Blob",
class extends Blackprint.Node {
	static input = {Body: Response};
	static output = {Data: Blob};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "As Blob";
	}
	async update(){
		let { Input, Output } = this.ref;
		if(Input.Body == null) return;

		Output.Data = await Input.Body.blob();
	}
});