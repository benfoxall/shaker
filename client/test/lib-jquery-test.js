
console.log(shakerdata,'ok');

describe('jquery 1.8', function(){

	function feat(what,test){
		describe(what, function(){
			shakerdata['jquery']['1.8'][feat] = 0;

			test();

			expect(shakerdata['jquery']['1.8'][feat]).to.be(1);
		});
	}

	
	feat('css', function(){
		$('body').css('marginTop',0);
	})

});