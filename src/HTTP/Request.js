/**
 * Perform HTTP request to an URL
 * @summary Perform HTTP request to an URL
 * @blackprint node
 */
Blackprint.registerNode("Network/HTTP/Request",
class extends Blackprint.Node {
	static input = {
		URL: String,
		/** HTTP method: GET, POST, PUT, DELETE */
		Method: String,
		/** Request headers */
		Headers: Object,
		/** Request query, will be appended on URL */
		Query: Context.VirtualType(Object, 'URLEncoded'),
		/** Request body */
		Body: Context.VirtualType(Object, ['BodyEncoded', 'URLEncoded']),
	};
	static output = {
		/**
		 * Response body that need to be casted before being consumed
		 * Note: You can only cast once, re-send request if needed
		 */
		Body: Response,
		/** Response headers */
		Headers: Object,
		/**
		 * HTTP Status
		 * can be 0 if host was not found, blocked by CORS, or other error
		 */
		Status: Number,
		/** True if the response was 200 OK (or in range 200 ~ 299)*/
		Success: Boolean,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "HTTP Request";

		this._toast = new NodeToast(iface);
	}

	async update(){
		let { Input, Output } = this.ref;

		if(!Input.URL || !Input.Method)
			return this._toast.warn("URL and Method must not be empty string");

		this._toast.clear();

		let craft = {
			method: Input.Method.toUpperCase(),
			cache: 'no-cache',
			redirect: 'follow',
			headers: Input.Headers ?? {},
		};

		if(Input.Body != null){
			craft.headers['Content-Type'] = Input.Body.type;
			craft.body = Input.Body.data;
		}

		let data = null;
		let url = Input.URL;

		if(Input.Query != null)
			url += (url.includes('?') ? '&' : '?') + Input.Query.data;

		try {
			data = await fetch(url, craft);
		} catch(e) {
			this._toast.error(e.message);
		}

		Output.Body = data;

		if(data != null){
			Output.Headers = data.headers;
			Output.Status = data.status;
			Output.Success = true;
		}
		else{
			Output.Headers = null;
			Output.Status = 0;
			Output.Success = false;
		}
	}
});