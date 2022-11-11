[![NPM](https://img.shields.io/npm/v/@blackprint/nodes-networking.svg)](https://www.npmjs.com/package/@blackprint/nodes-networking) [![Build Status](https://github.com/blackprint/nodes-networking/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/blackprint/nodes-networking/actions/workflows/build.yml)

## Networking nodes for Blackprint
This module gives you an ability to interact with networking stuff with [Blackprint](https://github.com/Blackprint/Blackprint).

## Import this nodes from URL
Please specify the version to avoid breaking changes.

```js
Blackprint.loadModuleFromURL([
  'https://cdn.jsdelivr.net/npm/@blackprint/nodes-networking@0.0.1/dist/nodes-networking.mjs'
], {
  // Turn this on if you want to load .sf.js, and .sf.css
  // only with single .mjs
  loadBrowserInterface: true // set to "false" for Node.js/Deno
});
```

## Development URL
You can use this link to load unpublished nodes and still under development on GitHub.
https://cdn.jsdelivr.net/gh/Blackprint/nodes-networking@dist/nodes-networking.mjs?1

Please append `/url-here?random-number` if your browser still using the cached files after the repository was updated.


## Local module server for development
```sh
$ cd /your/project/folder
$ git clone --depth 1 --recurse-submodules https://github.com/blackprint/nodes-networking.git .
$ pnpm i
$ npm start
 >> [Browsersync] Access URLs:
 >> -----------------------------------
 >> Local: http://localhost:6789
 >> -----------------------------------
```

Copy the `http://localhost:6789` URL and go to online Blackprint Editor. <br>
Go to development mode, and paste it to remote module server. Then refresh the page, after that you can modify the code from your favorite text editor. The compiler will watch every changes inside this folder by following the configuration in `blackprint.config.js`.

Before opening `.sf` file, please install the [syntax highlighter](https://github.com/StefansArya/scarletsframe-compiler/tree/master/syntax-highlighter) for your text editor.

> BPIC = Blackprint Interface Component

![brave_7NcrWUt66n](https://user-images.githubusercontent.com/11073373/159176092-7271f980-2a70-4e38-8830-e9746170426d.png)

### License
MIT