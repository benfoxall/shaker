describe('Feature function spy', function(){

	var feature, called, spyObj, args;

	beforeEach(function(){
		feature = new Feature();

		called = 0;
		spyObj = {
			fn:function(){
				args = arguments;
				called++;
				return "Hello";
			}
		}


		feature.spy(spyObj,'fn');
	});

	it("didn't call the function", function(){
		expect(called).to.be(0);
	});

	it('is unresolved', function(){
		expect(feature.resolved).to.be(false);
	});

	describe('calling', function(){
		var returned;

		beforeEach(function(){
			returned = spyObj.fn("test", 100)
		});

		it('called the function', function(){
			expect(called).to.be(1)
		});

		it('passed on the arguments', function(){
			expect(args[0]).to.be('test')
			expect(args[1]).to.be(100)
		});

		it('returned correctly', function(){
			expect(returned).to.be('Hello')
		});

		it('resolved to feature', function(){
			expect(feature.resolved).to.be(true);
		})

	})

});