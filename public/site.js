
// clear it out on load
localStorage.setItem('deps', '{}');

var s = document.createElement('span');
function safe(text){
	s.innerText = text;
	return s.innerHTML;
}

function to_ul(obj){
	var lis = [];
	for(var k in obj){
		if(obj.hasOwnProperty(k)){
			var used = obj[k];

			// hacky 'z' class to make the used appear on top
			var classname = used ? 'used':'z';

			lis.push('<li class="'+classname+'"><strong>'+safe(k)+'</strong> - '
					+ (used ? 'used':'not used')+'</li>');

		}
	}

	lis.sort();
	return "<ul>" + lis.join('') + "</ul>";
}

window.addEventListener("storage", function(e){
	if(e.key == 'deps'){

		var deps = JSON.parse(e.newValue);


		// hacky html building,  could use something a lot better in the future
		var htm = '<h2>Results</h2>';

		htm += '<h3>Core jQuery</h3>';
		htm += '<h4>More information can be found on the <a href="https://github.com/jquery/jquery#modules">jquery readme</a>. Check out <a href="http://projects.jga.me/jquery-builder/">jquery-builder</a> for an easy way to get a custom build.</h4>'
		htm += to_ul(deps.modules || {});


		htm += '<h3>Plugin functions</h3>';
		htm += '<h4>These are any plugins that have been added to the $.fn namespace.</h4>'
		htm += to_ul(deps.plugins || {});



		results.innerHTML = htm;

		// toggle some visibility
		results.className ='';
		instructions.className = 'inactive';
	}
}, false);






// hello!
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-35774866-2']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
