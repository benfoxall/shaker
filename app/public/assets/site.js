
// we'll include pubnub if we want to be doing this snazz
if(typeof(PUBNUB)!=='undefined'){
	(function(){
		var el = function(id){
			return document.getElementById(id);
		},
		el_show = function(id){
			el(id).style.display = 'block'
		},
		el_hide = function(id){
			el(id).style.display = 'none'
		};

		var each = function(obj, callback){
			for(var prop in obj){
				if(obj.hasOwnProperty(prop)){
					callback && callback(obj[prop], prop);
				}
			}
		}

		// INIT PubNub
		var pubnub = PUBNUB.init({
			publish_key : 'pub-c0f29142-e5b3-4ae5-a772-38ccb57f0a7f',
			subscribe_key : 'sub-c172f475-b21b-11e1-832b-bd42eaf713d5'
		});

		var channel = document.location.pathname.replace(/\//g,'');

		// el('url').innerText = document.location.origin + '/shaker.js?' + channel;

		// This started out kind of nice,  but has got horrible because I just
		// want to get this online at the moment.
		pubnub.subscribe({
			channel : channel,
			message : function(m){ 
				var data = JSON.parse(m);

				el('instruct').style.display = 'none';

				each(data, function(versions,name){
					el_show('x-' + name);

					each(versions, function(props, version){
						each(props, function(val, prop){
							// show the library
							if(val == 2){
								var li = el('x-' + name + '-' + prop);
								if(li.className == 'active'){
									li.className = '';
									setTimeout(function(){
										li.className = 'active';
									},100)
								} else {
									li.className = 'active';
								}
							}
							console.log(name, prop)
						});
					})
				})
			}
		});
	})();

}



// google analytics 
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-35774866-2']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


/*/ user voice
var uvOptions = {};
(function() {
	var uv = document.createElement('script'); uv.type = 'text/javascript'; uv.async = true;
	uv.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'widget.uservoice.com/TQuFqQc1nRfzqeih7XxA.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(uv, s);
})();*/