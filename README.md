XPSeed
======

A template for bootstraping node.js/express applications, containing the variuous libraries and a simple REST implementation.

###Characteristics
**Libraries**
* [AngularJS](https://angularjs.org/) 1.2.9
* [Bootstrap](http://getbootstrap.com/) 3.0.2
* [Bliss](https://github.com/cstivers78/bliss/wiki) template engine
* [Underscore](http://underscorejs.org/)

**Controllers**

There is a simple implementation of a RESTful controller using express routing, which you can find defined under controllers/controller.js.

This allows you to create controllers with security and a combination of methods and function names, for example:

Create a controller that responds to '/' and '/index' URIs, returning HTML; no need for security ('public')

```javascript
var ctrl = require('./controller').create();
exports.controller=ctrl.controller;

ctrl.map('GET','index',function (req,res,next){
	res.render('home/index',{title:"fijate"});
},'public');
```

And to create a API controller, that requires an authenticated call with the 'user' role, responding to the '/' URI.
```javascript
var ctrl = require('../controller').create();
exports.controller=ctrl.controller;

ctrl.map('GET','index',function (req,res,next){
	res.json({user:{name:'anonimous'}});
},'user');
```

Controller whose action name is index can be called either with or without the 'index' action name specified.

Router are created in the 'routes.js' file, where you specify the action name and other parameters, either optional or required, and simply map them to the controller created previously.

```javascript
app.all('/',home.controller);
app.all('/home/:action?',home.controller);
app.all('/api/users/:action?/:id?',api_users.controller);
```


**Enrique CR**
