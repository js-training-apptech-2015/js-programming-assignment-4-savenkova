var ObjectWithMethodOverloading = function() {
    var methods = {},
        defaultType = String; //дефолтный тип параметров методов

    this.nameSignature = function(types) {
        if (!types.length) {
            return '#';
        }
        var result = '';
        for (var i = 0; i < types.length; i++) {
            result += '#' + types[i].name.toLowerCase();
        }
        return result;
    }

    this.overload = function(name, method, args) {
        if (typeof args === 'undefined') {
            args = new Array(method.length)
            args = args.fill(defaultType);
        }
        if (typeof methods[name] === 'undefined') {
            methods[name] = {};
        }
        methods[name][this.nameSignature(args)] = method;
        this[name] = function() {
            if (typeof methods[name] !== 'undefined'
                && (typeof (fn = methods[name][this.detectSignature(arguments)])).toLowerCase() === 'function') {
                return fn.apply(this, arguments);
            }
        }
    }

    this.detectSignature = function(values) {
        if (!values.length) {
            return '#';
        }
        var result = '';
        for (var i = 0; i < values.length; i++) {
            result += '#' + this.detectType(values[i]);
        }
        return result;
    }

    this.detectType = function(value) {
        var result = (typeof value).toLowerCase();
        if (['function', 'array', 'object'].indexOf(result) > -1) {
            return result;
        } else if (result === 'undefined') {
            return defaultType.name.toLowerCase();
        }

        return (value === +value) ? 'number' : 'string';
    }
}

var tempObj = new ObjectWithMethodOverloading();

tempObj.overload('aaa', function(a,b,c){ console.log(1) });
tempObj.overload('aaa', function(a,b,c){console.log(b*b)}, [String, Number, Number]);
tempObj.overload('aaa', function(a,b,c){console.log(b+c)}, [String, String, String]);

console.log(tempObj);

tempObj.aaa('asd','sdf',undefined);
tempObj.aaa('asd',2,3);
tempObj.aaa();