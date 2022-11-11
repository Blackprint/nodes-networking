// This script will run first, and then the other files
// depends on blackprint.config.js configuration

//> Required, this should be run before importing modules
//> Blackprint will know if it need to load other interface module
// Let the Blackprint Editor know the source URL where
// the registerNode and registerInterface belongs to
let Blackprint = window.Blackprint.loadScope({
	// You can find the URL on Blackprint menu -> Modules
	// This will also be exported to JSON if this module's nodes is being used
	url: import.meta.url,

	// This will autoload (*.sf.mjs) and (*.sf.css) file for Browser
	hasInterface: true,

	// This will autoload (*.docs.json) for Browser
	hasDocs: true,
});

// For Browser & Deno
let WebSocket = globalThis.WebSocket;

// For Node.js
if(WebSocket == null){
	WebSocket = (await import('ws')).WebSocket;
	WebSocket.addEventListener = WebSocket.on;
	WebSocket.removeEventListener = WebSocket.off;
}

// Global shared context (share to _init.sf)
let Context = Blackprint.createContext('Networking');

// This is needed to avoid duplicated event listener when using hot reload
// Event listener that registered with same slot will be replaced
Context.EventSlot = {slot: 'my-private-event-slot'};