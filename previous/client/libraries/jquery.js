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