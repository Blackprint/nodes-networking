Blackprint.registerNode("Networking/HTTP/Data/Send/URLEncoded",
class extends Blackprint.Node {
	static input = {
		/** You can right click this port to create a new port */
		data: String,
	};
	static output = {
		Data: Context.VirtualType(Object, "URLEncoded"),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface("BPIC/Networking/HTTP/Data/Send/URLEncoded");
		iface.title = "URL Encoded";
	}

	update(){
		let { Input, Output } = this.ref;
		Output.Data = {
			type: 'application/x-www-form-urlencoded',
			data: serializeQuery(Input),
		};
	}
});

Blackprint.registerInterface("BPIC/Networking/HTTP/Data/Send/URLEncoded",
Context.HTTPDataSendURLEncoded = class extends Blackprint.Interface{
	exportData(){
		return {
			input: Object.keys(this.input)
		}
	}
});

function serializeQuery(params) {
	const keys = [];
	for(let key in params){
		const val = params[key];
		if (val.constructor === Array){
			for (let i = 0; i < val.length; i++)
				keys.push(`${key}[]=${encodeURIComponent(val[i])}`);
			continue;
		}

		if(val.constructor === Object){
			for(let valKey in val)
				keys.push(`${key}[${valKey}]=${encodeURIComponent(val[valKey])}`);
			continue;
		}

		keys.push(`${key}=${encodeURIComponent(val)}`);
	}

	return keys.join('&');
}