# JS Programming assignment 4
---
## Task 1
Implement an AMD module loader.
There should be a global function `define`, that accepts an array of Strings (dependencies) and a callback function, that gets executed when all the dependencies are loaded:
```javascript
function define(['dep.file.js', 'widgets/dep2.file.js'], function(dep1, dep2) {
    function add(x, y) {
        return Number(x) + Number(y);
    }
    return add;
});
```
The export is a returning value of the call back function

### Assumptions
* a modern environment Chrome, FF or Edge: [Promises](http://caniuse.com/#search=Promise)

### Challenge (not obligatory)
extend the loader so that it is capable of loading not only JS AMD modules but any files (e.g. as text):
```javascript
function define(['text!my.text.file.txt', 'image!logo.png'], function(text, image) {
    console.log(text);
    return {};
});
```

References:
* [<SCRIPT>](https://developer.mozilla.org/ru/docs/Web/HTML/Element/script)
* [Promise](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise)
