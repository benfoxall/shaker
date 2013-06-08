

// var shakerdata = {},
// 	endpoint;

// // look for the shaker.js script, and use it to 
// // generate an endpoint
// var scripts = document.scripts;
// for(var i = 0; i < scripts.length; i++){
// 	var src = scripts[0].src;

// 	var match = src.match(/(.*)shaker\.js\?1(.*)/);
// 	if(match){
// 		endpoint = match.slice(1).join('') + '/send.png';
// 	}
// }

// function send(lib, version, feature, state){

// 	shakerdata[lib] = shakerdata[lib] || {};
// 	shakerdata[lib][version] = shakerdata[lib][version] || {};

// 	shakerdata[lib][version][feature] = state;

// 	if(endpoint){

// 		var jstr = JSON.stringify(shakerdata);

// 		(new Image).src = endpoint + '?d=' + encodeURIComponent(jstr);

// 	}
// }
