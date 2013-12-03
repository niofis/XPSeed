'use strict';
/*jshint node:true */

var _ = require('underscore');

exports.create=function(){
	var _methods = {
		GET:{},
		POST:{},
		PUT:{},
		DELETE:{}
	};
	var functions={};

	functions.controller = function(req,res,next){

		var action=_methods[req.method.toUpperCase()][req.params.action || 'index'];
		if(action){
			if(action.permit=='public'){
				action.action(req,res,next);
			} else {
				if(!req.user){
					res.redirect("/users/login?url=" + req.url);
				} else if(action.permit==='user'){
					action.action(req,res,next);
				} else if(req.user.roles[action.permit]){
					action.action(req,res,next);
				} else {
					res.status(401).send('Unauthorized');
				}
			}
		} else {
			res.status(404).send('Not found');
		}
	}

	functions.map = function(methods,action_name,action,permit){
		var mts=methods.toUpperCase().split(" ");
		mts.forEach(function(m){
			_methods[m][action_name]={action:action, permit:permit};
		});
	}

	return functions;
}