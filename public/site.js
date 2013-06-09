
var s = document.createElement('span');
function safe(text){
	s.innerText = text;
	return s.innerHTML;
}

window.addEventListener("storage", function(e){
	if(e.key == 'deps'){
		results.className ='';

		instructions.style.height = instructions.offsetHeight + 'px';
		instructions.className = 'inactive';
		setTimeout(function(){
			instructions.style.height = '0px'	
		},100)
		

		var deps = JSON.parse(e.newValue);


		// hacky html building,  could use something a lot better in the future
		var htm = '';
		var lis = [];

		var modules = deps.modules || {};
		for(var k in modules){
			if(modules.hasOwnProperty(k)){
				var used = modules[k];

				// hacky 'z' class to make the used appear on top
				var classname = used ? 'used':'z';

				lis.push('<li class="'+classname+'"><strong>'+safe(k)+'</strong> - '
						+ (used ? 'used':'not used')+'</li>');

			}
		}
		lis.sort();
		results_list.innerHTML = lis.join('');
	}
}, false);