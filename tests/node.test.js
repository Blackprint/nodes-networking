/**
 * @jest-environment node
 */

let window = globalThis;
require("@blackprint/engine");

let instance = null;
test('Blackprint does exist on window', async () => {
	expect(window.Blackprint).toBeDefined();

	// Create an instance where we can create nodes or import JSON
	instance = new Blackprint.Engine();
});

jest.setTimeout(30e3); // 1 minute

// If you're ready to create unit test for your module
// Please change `test.only()` into `test()`

// This may took longer to finish if also loading additional modules
test("Load required modules", async () => {
	// Force it as Node.js environment
	Blackprint.Environment.isBrowser = false;
	Blackprint.Environment.isNode = true;

	// Alternative for Blackprint.loadModuleFromURL(...);
	await import("../dist/nodes-networking.mjs"); // For Browser/Node.js

	// Wait and avoid Jest's test environment being torn down
	await Blackprint.getContext('Networking');
	await new Promise(resolve => setTimeout(resolve, 1000));

	// Check if the nodes has been registered
	expect(Blackprint.nodes['Networking']).toBeDefined();
});

// This should work without Jest's sandboxed test environment
test.skip("Do a request", (done) => {
	let Request = instance.createNode('Networking/HTTP/Request');
	let URLEncoded = instance.createNode('Networking/HTTP/Data/Send/URLEncoded', {data: {input: ['name']}});
	let asJSON = instance.createNode('Networking/HTTP/Data/Receive/JSON');

	let url = new Blackprint.OutputPort(String);
	url.value = 'https://api.agify.io/';

	let query = new Blackprint.OutputPort(String);
	query.value = 'hello';

	query.connectPort(URLEncoded.input.name);	
	url.connectPort(Request.input.URL);
	Request.input.Query.connectPort(URLEncoded.output.Data);

	Request.output.Body.connectPort(asJSON.input.Body);
	asJSON.output.Data.once('value', ({ cable }) => {
		console.log('ahoyy');
		expect(cable.value.name).toBe("hello");
		done();
	});

	Request.ref.Input.Trigger();
});