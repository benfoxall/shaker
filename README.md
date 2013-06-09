[![Nodejitsu Deploy Status Badges](https://webhooks.nodejitsu.com/benfoxall/shaker.png)](https://webops.nodejitsu.com#benfoxall/shaker)

# Shaker

This is a tool for finding out which parts of jquery you're using.


### Dependency transfer formats/style

The collection from the script will be messages:

```
transport.send('modules.css=true')
```

This is brought together in the final ui with a format along the lines of:

```js
{
	modules:{
		ajax:null, // not yet used
		css:true,  //has been used
		//…
	},
	plugins:{
		fancybox: null,
		//…	
	}
}
```

## Licence

Copyright &copy; 2013 Ben Foxall

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.