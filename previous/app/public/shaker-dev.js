;(function(){




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

// send data to the endpoint
var push = (function(){

	// look for the shaker.js script, and use it to 
	// generate an endpoint
	var endpoint = (function(){
			var scripts = document.scripts;
			for(var i = 0; i < scripts.length; i++){
				var src = scripts[i].src;

				var match = src.match(/(.*)shaker\.js\?(.*)/);

				// console.log(src, match);
				if(match){
					return match.slice(1).join('') + '/push.png';
				}
			}
		}()),
		data = [], 
		timer;

	return function(d){
		data.push(d);
		debounceFlush();
	}

	function debounceFlush(){
		if(timer){
			clearTimeout(timer)
		}
		timer = setTimeout(flush, 10);
	}

	// send the data to the endpoint
	function flush(){

		// consume and roll items into a json object
		// (this should be the first thing to be rewritten)
		var obj = {}, robj, i, j;
		while(i = data.shift()){
			robj = obj;
			while(j = i.shift()){
				robj[j] = robj[j] || {};
				if(i.length == 1){
					robj[j] = i.shift();
				}
				robj = robj[j];
			}
		}

		if(endpoint){
			var jstr = JSON.stringify(obj);
			(new Image).src = endpoint + '?d=' + encodeURIComponent(jstr);
		} else {
			console.log(">>", JSON.stringify(obj));
		}

	}
})();







// spy on an objects function, when called call back, 
// through and replace with original
function Spy(obj,fn,cb){
	var original = obj[fn];
	obj[fn] = function(){
		cb();
		obj[fn] = original;
		return original.apply(this,arguments);
	}
}


function Feature(successArgs){
	this.successArgs = successArgs;
	this.resolved = false;
};

Feature.prototype.resolve = function(){
	this.resolved = true;
	if(this.successArgs){
		push(this.successArgs);
		this.successArgs = null;
	}

}

Feature.prototype.spy = function(obj, fns){
	var f = this,
		fns = fns.split(' ');

	for(var i = fns.length; i; i--){
		new Spy(obj,fns[i-1],function(){
			f.resolve();
		});
	}
};


function library(name, version, hooks){

	// make version default to '_'
	if(!hooks){
		hooks = version;
		version = '_';
	}


	if(hooks._check()){
		/*
			key:
				0 - failed
				1 - unused
				2 - used
		*/

		for(var h in hooks){
			if(hooks.hasOwnProperty(h) && h.charAt(0) != '_'){
				var state = 1;
				// try{
					hooks[h](new Feature([name,version,h,2]));
				// } catch(e){
					// console.error(e);
					// state = 0;
				// }
				push([name,version,h,state]);
			}
		}
	}

};




library('jquery','1.8', {

	_check:function(){
		return	typeof(jQuery) !== 'undefined' &&
				jQuery().jquery.indexOf('1.8') === 0;
	},

	ajax: function(feature){
		feature.spy($,'ajax');
		feature.spy($.fn,'load');
	},

	css: function(feature){
		feature.spy($.fn,'css');
	},

	dimensions: function(feature){
		feature.spy($.fn,'width height');
	},

	effects: function(feature){
		feature.spy($.fn,'animate fadeTo stop');
		// (slide|fade)(up|down|toggle) all use .animate

		// todo (?) : speed,easing,timers,fx
	},

	offset: function(feature){
		feature.spy($.fn,'offset position offsetParent');
		feature.spy($.offset,'setOffset');
	}

});
// todo
//library('jquery.mobile', {
// });


})();
