Blackprint.registerNode("Networking/HTTP/Data/Send/Multipart",
class extends Blackprint.Node {
	static input = {
		/** You can right click this port to create a new port */
		data: Blackprint.Port.Union([String, Number, Uint8Array, Blob]),
	};
	static output = {
		Data: Context.VirtualType(Object, "BodyEncoded"),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface("BPIC/Networking/HTTP/Data/Send/Multipart");
		iface.title = "Multipart";
	}

	imported(data){
		let input = data?.input;
		if(input == null) return;
		this.deletePort('input', 'data');

		let type = Blackprint.Port.Union([String, Number, Uint8Array, Blob]);
		for (let i=0; i < input.length; i++) {
			this.createPort('input', input[i], type);
		}
	}

	update(){
		let { Input, Output } = this.ref;
		let data = new FormData();
		for(var name in Input){
			const val = Input[name];

			if(val.constructor === Array){
				for (let i = 0; i < val.length; i++)
					data.append(`${name}[]`, val[i]);
				continue;
			}

			if(val.constructor === Object){
				for(let valKey in val)
					data.append(`${name}[${valKey}]`, val[valKey]);

				continue;
			}

			data.append(name, val);
		}

		Output.Data = {
			type: 'multipart/form-data', data,
		};
	}
});

// If without sketch
Blackprint.registerInterface("BPIC/Networking/HTTP/Data/Send/Multipart",
Context.HTTPDataSendMultipart = class extends Blackprint.Interface{
	exportData(){
		return {
			input: Object.keys(this.input)
		}
	}
});